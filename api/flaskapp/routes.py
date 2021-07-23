from flask import request, jsonify, abort, redirect, url_for, render_template, send_file
from flaskapp import app, db, bcrypt
from flaskapp.models import UserModel, user_schema, users_schema, WorkflowModel
from flask_login import login_user, current_user, logout_user
import uuid
from io import BytesIO

# create calls for user database
@app.route('/api/v1/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        # return redirect(url_for('home')) # theres no home yet
        pass

    if (request.method == 'POST'):

        # get data
        user_data = request.get_json(force=True)

        # extract info
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        role = user_data['role']

        # check validation:
        search_user_by_name = UserModel.query.filter_by(username=username).first()
        if search_user_by_name:
            abort(409, description="This username already exists")
        
        search_user_by_email = UserModel.query.filter_by(email=email).first()
        if search_user_by_email:
            abort(409, description="This email is already used")

        # assign random unique id
        user_key = uuid.uuid4().hex

        # add the user
        new_user = UserModel(user_key=user_key, username=username, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return 'user created successfully', 201


@app.route('/api/v1/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        # return redirect(url_for('home')) # theres no home yet
        pass

    if (request.method == 'POST'):

        # get data
        user_data = request.get_json(force=True)

        # extract info
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']

        # query the database and check password
        user = UserModel.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password.encode('utf-8')):
            login_user(user, remember=True)
            return 'Log in successfully', 200
        else:
            return 'Not successful, wrong password or email', 403


@app.route('/api/v1/logout')
def logout():
    logout_user()
    return 'Logout successfully', 200


@app.route('/api/v1/getuser/<key>', methods=['GET'])
def get_user(key):
    user = UserModel.query.filter_by(user_key=key).first()
    return user_schema.jsonify(user)


@app.route('/api/v1/getallusers')
def get_all_users():
    users = UserModel.query.all()
    return users_schema.jsonify(users)


@app.route('/api/v1/deleteall')
def delete():
    UserModel.query.delete()
    db.session.commit()
    return 'Delete', 200

# create calls for workflow database
@app.route('/api/v1/workflow/')
def workflow_hello():
    # redirect(url_for('publish'))
    return 'hi'


@app.route('/api/v1/workflow/publish', methods=['POST', 'GET'])
def publish():
    if request.method == 'POST':
        file = request.files['file']
        file_name = file.filename
        new_file = WorkflowModel(owner="Mr. Owen", name=file.filename, content=file.read())
        db.session.add(new_file)
        db.session.commit()
        return file.filename + ' is saved.', 201
    if request.method == 'GET':
        return render_template('upload.html')


@app.route('/api/v1/workflow/get/<file_id>', methods=['GET'])
def get_workflow(file_id):
    chosen_workflow = WorkflowModel.query.get(file_id)
    return send_file(BytesIO(chosen_workflow.content), as_attachment=True, attachment_filename="download.nc")


@app.route('/api/v1/workflow/delete/<file_id>', methods=['GET'])
def delete_workflow(file_id):
    chosen_workflow = WorkflowModel.query.get(file_id)
    db.session.delete(chosen_workflow)
    db.session.commit()
    return 'Delete workflow successfully', 200
