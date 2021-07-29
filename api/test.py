import requests
import json

BASE = "http://192.168.10.106:5000/api/v1/"

user = {
    "username": "Palo Santo",
    "password": "12345",
    "email": "PLST@gmail.com",
    "role": "user"
}

# res1 = requests.post(BASE + "register", user)
# print(res1)
res2 = requests.post(BASE + "login", json.dumps(user))
res0 = requests.get(BASE + "getallusers")
print(res0.json())
# owenry-hellport-download(1)
response = requests.get(BASE + "workflow/execute/test_queue")
print(response.json())