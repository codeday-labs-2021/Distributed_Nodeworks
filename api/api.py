from flaskapp import create_all
# go to Postman and send the api request from there

app = create_all()
app.app_context().push()

# this is only for running the program, everything else is working in the flaskapp package, thanks to __init__.py
if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
