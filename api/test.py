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
    }, 
    {
        'id': 4,
        'username': 'Guy4',
        'email': 'Guy4@gmail.com',
        'password': '43215',
        'role': 'user'
    }, 
    {
        'id': 5,
        'username': 'Guy5',
        'email': 'Guy5@gmail.com',
        'password': '788798',
        'role': 'user'
    }, 
    {
        'id': 6,
        'username': 'Guy5',
        'email': 'Guy6@gmail.com',
        'password': '788798',
        'role': 'user'
    }
]

# for i in range(len(mock_data)):
    # response = requests.post(BASE + "register/" + str(i + 1), json=mock_data[i]) (this is post request)
post = requests.post(BASE + "register/" + "6", json=mock_data[5])

# this is GET request
response = requests.get(BASE + "register/" + "5")
print(response.json())
