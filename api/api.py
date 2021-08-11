from flaskapp import app
# how I view the data table:
# enter virtual environment 
# >>> python
# >>> from api import UserModel
# >>> UserModel.query.all()
# or
# go to Postman and send the api request from there

# this is only for running the program, everything else is working in the flaskapp package, thanks to __init__.py
print("TEST")
if __name__ == '__main__':
    app.run()
