from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

# getting unique user key for security, will improve later
app.config['SECRET_KEY'] = 'ufhkjkbfieihf7398738'

# setting up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# create data table
@app.before_first_request
def create_tables():
    db.create_all()

from flaskapp import routes
