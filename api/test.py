# testing the server
import requests
import json

BASE = "http://localhost:5000/api/v1/"

mock_data = [
    {
        'id': 1,
        'username': 'Guy1',
        'email': 'Guy1@gmail.com',
        'password': '12345',
        'role': 'user'
    },

    {
        'id': 2,
        'username': 'Guy2',
        'email': 'Guy2@gmail.com',
        'password': '12345',
        'role': 'user'
    },

    {
        'id': 3,
        'username': 'Guy3',
        'email': 'Guy3@gmail.com',
        'password': '12345',
        'role': 'user'
    }
]

# for i in range(len(mock_data)):
    # response = requests.post(BASE + "register/" + str(i + 1), json=mock_data[i]) (this is post request)

# this is GET request
response = requests.get(BASE + "register/" + "2")
print(response.json())
