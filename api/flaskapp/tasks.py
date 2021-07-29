import time
from flask import Flask
from flaskapp import rq

@rq.job
def execute_node(node):
    print(node)
    time.sleep(1)
