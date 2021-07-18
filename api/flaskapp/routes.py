from flaskapp import app, db, bcrypt
from flask import request, jsonify, abort, redirect, url_for
from flaskapp.models import UserModel, user_schema
from flask_login import login_user, current_user, logout_user

# create calls
@app.route('/api/v1/register/<id>', methods=['POST', 'GET'])
def register(id):
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
        
        # add the user
        new_user = UserModel(id=id, username=username, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return 'user created successfully', 201

    if (request.method == 'GET'):
        user = UserModel.query.get(id)
        return user_schema.jsonify(user)


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