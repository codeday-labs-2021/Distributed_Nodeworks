from flaskapp import app, db
from flask import request, jsonify
from flaskapp.models import UserModel, user_schema

# create calls
@app.route('/api/v1/register/<id>', methods=['POST', 'GET'])
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

    if (request.method == 'GET'):
        user = UserModel.query.get(id)
        return user_schema.jsonify(user)
