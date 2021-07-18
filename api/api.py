from flaskapp import app
# how I view the data table:
# enter virtual environment 
# >>> python
# >>> from api import UserModel
# >>> UserModel.query.all()
# or
# go to Postman and send the api request from there

if __name__ == '__main__':
    app.run()
