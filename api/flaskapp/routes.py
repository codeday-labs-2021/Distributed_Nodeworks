from flask import request, jsonify, abort, redirect, url_for, render_template, send_file, Blueprint
from flaskapp import db, bcrypt, q, r
from flaskapp.models import UserModel, user_schema, users_schema, WorkflowModel, workflow_schema, workflows_schema
from flaskapp.dag_solver import dag_solver_flow
from flaskapp.tasks import whatever
from flask_login import login_user, current_user, logout_user
import ast
import uuid
import os
import redis
from io import BytesIO
import json
import time
from rq import Worker, Queue, Connection
from rq.command import send_kill_horse_command, send_shutdown_command
from rq.worker import Worker, WorkerStatus

api_bp = Blueprint("api", __name__)

# queue task handler
def execute_node(item):
    print("task running...")
    item = str(item)
    print(item)
    time.sleep(2)
    return len(item)


# routes
@api_bp.route('/api/v1/', methods=['GET'])
def home():
    return 'Hello', 200

# create calls for user database
@api_bp.route('/api/v1/register', methods=['GET','POST'])
def register():
    if current_user.is_authenticated:
        return jsonify(
            success = True,
            user = current_user.is_authenticated
        )

    if (request.method == 'POST'):

        # get data
        user_data = request.get_json(force=True)

        # # extract info
        username = user_data['username']
        email = user_data['emailAddress']
        password = user_data['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        # role = user_data['role']

        # check validation:
        search_user_by_name = UserModel.query.filter_by(username=username).first()
        if search_user_by_name:
            abort(409, description="This username already exists")
        
        search_user_by_email = UserModel.query.filter_by(email=email).first()
        if search_user_by_email:
            abort(409, description="This email is already used")

        # assign random unique id
        user_key = uuid.uuid4().hex

        # # add the user
        new_user = UserModel(user_key=user_key, username=username, email=email, password=hashed_password, role = "user")
        # #left out role = role
        db.session.add(new_user)
        db.session.commit()

        return 'user created successfully', 201
    return "hello"



@api_bp.route('/api/v1/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return jsonify(
            success = True,
            user = current_user.is_authenticated
        )

    if (request.method == 'POST'):

        # get data
        user_data = request.get_json(force=True)

        # extract info
        username = user_data['username']
        email = user_data['emailAddress']
        password = user_data['password']

        # query the database and check password
        user = UserModel.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password.encode('utf-8')):
            login_user(user, remember=True)
            return user_schema.jsonify(user)
        else:
            print("HELLO NOT SUCCESSFUL")
            return 'Not successful, wrong password or email', 403


@api_bp.route('/api/v1/logout')
def logout():
    if current_user.is_authenticated:
        logout_user()
        return 'Logout successfully', 200
    else:
        abort(403, description="Not logged in")
    

@api_bp.route('/api/v1/getuser/<key>', methods=['GET'])
def get_user(key):
    user = UserModel.query.filter_by(user_key=key).first()
    return user_schema.jsonify(user)


@api_bp.route('/api/v1/getme', methods=['GET'])
def who_am_i():
    if current_user.is_authenticated:
        return current_user.username


@api_bp.route('/api/v1/getallusers')
def get_all_users():
    users = UserModel.query.all()
    return users_schema.jsonify(users)


@api_bp.route('/api/v1/deleteall')
def delete():
    UserModel.query.delete()
    db.session.commit()
    return 'Delete', 200


# create calls for workflow database
@api_bp.route('/api/v1/workflow/')
def workflow_hello():
    return 'This is workflow'


@api_bp.route('/api/v1/workflow/publish/<key>', methods=['POST', 'GET', 'PUT'])
def publish(key):
    user = UserModel.query.filter_by(user_key=key).first()
    if user != None:
        if request.method == 'POST':
            file_data = request.get_json(force=True)
            file_name = file_data['fileId']
            owner = file_data['user']
            file_content = str(file_data["node"])
            file_id = owner.lower().replace(" ", "-") + "-" + file_name.lower().strip(" _")

            search_file_by_id = WorkflowModel.query.filter_by(file_id=file_id).first()
            if search_file_by_id:
                abort(409, "This filename has already existed in your account. Please rename.")

            new_file = WorkflowModel(owner=owner, name=file_name, content=file_content, file_id=file_id)
            delete_workflow(file_id)
            db.session.add(new_file)
            db.session.commit()
            return 'File is post.', 201

        if request.method == 'PUT':
            file_data = request.get_json(force=True)
            file_name = file_data['fileId']
            owner = file_data['user']
            file_content = str(file_data['node'])
            file_id = owner.lower().replace(" ", "-") + "-" + file_name.lower().strip(" _")
            search_file_by_id = WorkflowModel.query.filter_by(file_id=file_id).first()
            if search_file_by_id:
                delete_workflow(file_id)
                db.session.commit()
            
            new_file = WorkflowModel(owner=owner, name=file_name, content=file_content, file_id=file_id)
            db.session.add(new_file)
            db.session.commit()
            return 'File is put.', 201

        if request.method == 'GET':
            return render_template('upload.html')
    else:
        abort(403, description="Not logged in")


@api_bp.route('/api/v1/workflow/seefile/<id>', methods=['GET'])
def see_file(id):
    chosen_workflow = WorkflowModel.query.get(id)
    return workflow_schema.jsonify(chosen_workflow)

@api_bp.route('/api/v1/workflow/seeAllfile', methods=['GET'])
def see_All_file():
    chosen_workflows = WorkflowModel.query.all()
    return workflows_schema.jsonify(chosen_workflows)


@api_bp.route('/api/v1/workflow/download/<file_id>', methods=['GET'])
def download_workflow(file_id):
    if current_user.is_authenticated:
        chosen_workflow = WorkflowModel.query.filter_by(file_id=file_id).first()
        return send_file(BytesIO(chosen_workflow.content), as_attachment=True, attachment_filename="download.nc")
    else:
        abort(403, description="Not logged in")


@api_bp.route('/api/v1/workflow/get/<file_id>', methods=['GET'])
def get_workflow(file_id):
    if(True):
        chosen_workflow = WorkflowModel.query.filter_by(file_id=file_id).first()
        return workflow_schema.jsonify(chosen_workflow)
    else:
        abort(403, description="Not logged in")

@api_bp.route('/api/v1/workflow/getOwner/<owner>', methods=['GET'])
def get_User_workflow(owner):
    if(True):
        chosen_workflow = WorkflowModel.query.filter_by(owner=owner).all()
        return workflows_schema.jsonify(chosen_workflow)
    else:
        abort(403, description="Not logged in")


@api_bp.route('/api/v1/workflow/delete/<file_id>', methods=['GET'])
def delete_workflow(file_id):
    chosen_workflow = WorkflowModel.query.filter_by(file_id=file_id).first()
    db.session.delete(chosen_workflow)
    db.session.commit()
    return 'Delete workflow successfully', 200


@api_bp.route('/api/v1/workflow/execute/<file_id>')
def execute_file(file_id):
    if True:
        chosen_workflow = WorkflowModel.query.filter_by(file_id=file_id).first()
        json_content = json.dumps(ast.literal_eval(chosen_workflow.content))
        json_content = json.loads(json_content)
        sorted_order = dag_solver_flow(json_content)
        # for node in sorted_order:
        #     job = q.enqueue(whatever, str(node))
        return json.dumps(sorted_order), 200
    else:
        abort(403, description="Not logged in")


@api_bp.route('/api/v1/workflow/execute/test_queue')
def test_queue():
    job = q.enqueue(whatever, "abcdefghijklmnop")
    return json.dumps(f"Theres a job {job.id}, {len(q)} tasks right now.")


@api_bp.route('/api/v1/queue/clear')
def clear_queue():
    q.empty()
    return json.dumps(f"Queue emptied. There is {len(q)} tasks right now.")


@api_bp.route('/api/v1/queue/status')
def status_queue():
    return json.dumps(f"There is {len(q)} tasks right now.")


# the problem, no longer implemented
# @api_bp.route('/api/v1/runners/register')
# def register_runner():
#     message = asyncio.run(run_worker())
#     return "Runner has been registered and worked", 200    


@api_bp.route('/api/v1/runners/status')
def status_runner():
    workers = Worker.all(connection=r)
    report = ''
    for worker in workers:
        report += f"Runner status: name = {worker.name}, queues = {worker.queues}, state = {worker.state}, successful job counts = {worker.successful_job_count}\n"
    return report, 200


@api_bp.route('/api/v1/runners/cancel')
def cancel_runner_job():
    workers = Worker.all(connection=r)
    for worker in workers:
        if worker.state == WorkerStatus.BUSY:
            send_kill_horse_command(r, worker.name)
    return "Runners' jobs are cancelled.", 200


@api_bp.route('/api/v1/runners/shutdown')
def cancel_worker():
    workers = Worker.all(connection=r)
    for worker in workers:
        send_shutdown_command(r, worker.name)
    return "Runners are shutdown", 200