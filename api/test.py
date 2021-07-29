import requests

BASE = "http://192.168.10.106:5000/api/v1/"

user = {
    "username": "ubuntu",
    "email": "saloto@gmail.com",
    "role": "user",
    "password": 12345
}

response = requests.get(BASE + "workflow/execute/owenry-hellport-download(1)")
print(response)