from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
    if(request.method=="POST"):
        print("HKFHJAKFJ")
        name = (request.form.get("login"))
        return {'name': name}
    return "hello"

if __name__ == "__main__":
    app.run()