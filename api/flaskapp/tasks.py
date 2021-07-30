import time
from flask import Flask
from flask_rq2 import RQ

rq = RQ()
@rq.job

def execute_node(node):
    node = str(node)
    time.sleep(1)
    return node
