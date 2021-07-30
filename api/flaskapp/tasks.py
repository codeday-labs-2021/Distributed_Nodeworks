import time
from flask import Flask
# from flask_rq2 import RQ

def whatever(item):
    print("task running...")
    item = str(item)
    time.sleep(2)
    return len(item)
