class Config(object):
    SECRET_KEY = "guess-who?"
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    SQLALCHEMY_BINDS = {"workflow_db" : "sqlite:///workflow_database.db"}
    SQLALCHEMY_TRACK_MODIFICATIONS = False