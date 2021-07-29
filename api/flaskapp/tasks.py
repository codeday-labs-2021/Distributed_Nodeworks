import time
from flask import Flask
# from flask_rq2 import RQ

def execute_node(item):
    print("task running...")
    item = str(item)
    time.sleep(2)
    return len(item)
