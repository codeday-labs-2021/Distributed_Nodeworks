from flaskapp import app, db, bcrypt
from flask import request, jsonify
from flaskapp.models import UserModel, user_schema

# create calls
@app.route('/api/v1/register/<id>', methods=['POST', 'GET'])
def register(id):
    if (request.method == 'POST'):
        # get data
        user_data = request.get_json(force=True)

        # extract info
        username = user_data['username']
        email = user_data['email']
        password = user_data['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        role = user_data['role']

        # check the account, add the user
        new_user = UserModel(id=id, username=username, email=email, password=hashed_password, role=role)
        new_user.validate_username(username)
        new_user.validate_email(email)
        
        db.session.add(new_user)
        db.session.commit()

        return 'user created successfully', 201

    if (request.method == 'GET'):
        user = UserModel.query.get(id)
        return user_schema.jsonify(user)
