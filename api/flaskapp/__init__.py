from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from redis import Redis
from flask_rq2  import RQ
from config import Config

rq = RQ()
ma = Marshmallow()
bcrypt = Bcrypt()
login_manager = LoginManager()
db = SQLAlchemy()

def create_all(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    rq.init_app(app)
    db.init_app(app)
    ma.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        from flaskapp.routes import api_bp
        app.register_blueprint(api_bp)
        db.create_all()

    return app


from flaskapp import routes
