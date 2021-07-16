import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with

app = Flask(__name__)

# getting unique user key for security, will improve later
app.config['SECRET_KEY'] = 'ufhkjkbfieihf7398738'

# setting up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# data model
class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False) # hashed password
    role = db.Column(db.String(5), nullable=False) # role is admin or user

    def __repr__(self):
        return f"User(username: {self.username}, password: {self.password}, email: {self.email})"

# create data table
@app.before_first_request
def create_tables():
    db.create_all()

# create calls
@app.route('/api/v1/register/<id>', methods=['POST'])
def register(id):
    if (request.method == 'POST'):
        user_data = request.get_json(force=True)
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        role = user_data['role']

        new_user = UserModel(id=id, username=username, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return '''
            The username value is: {}
            The email value is: {}
            The password version is: {}
            The role is: {}
        '''.format(username, email, password, role), 201

# how I view the data table:
# enter virtual environment 
# >>> python
# >>> from api import UserModel
# >>> UserModel.query.all()

