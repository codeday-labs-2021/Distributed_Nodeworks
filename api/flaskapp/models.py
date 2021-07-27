# where I would move all the database models
# data model and serialization (helps convert to json)
from flaskapp import ma, db, login_manager
from flask import abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
from marshmallow import Schema # for serializing the object into JSON data 
from flask_login import UserMixin # to represent a User class with important attributes like isActive, isLoggedin, isAnonymous, etc

@login_manager.user_loader
def load_user(user_id):
    return UserModel.query.get(int(user_id))

class UserModel(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_key = db.Column(db.String(32), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False) # hashed password
    role = db.Column(db.String(5), nullable=False) # role is admin or user

    def __repr__(self):
        return f"User(username: {self.username}, password: {self.password}, email: {self.email})"

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "user_key", "username", "email", "password", "role")

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class WorkflowModel(db.Model):
    __bind_key__ = 'workflow_db'
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String(32), nullable=False)
    name = db.Column(db.String(32), nullable=False)
    content = db.Column(db.String)

    def __repr__(self):
        return f"Workflow(name: {self.name}, owner: {self.owner}, data: {self.content})"

db.create_all()