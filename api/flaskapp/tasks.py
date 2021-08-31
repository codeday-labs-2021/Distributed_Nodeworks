import time
from flask import Flask
import json
# from flask_rq2 import RQ

def whatever(node_list):
    # node list is a list of dictionaries
    print("task running...")
    delivery = {} # example: {node_1: 1234}
    for node in node_list:
        if node["name"] in delivery: # if there's an input waiting for a current node
            node["data"]["content"] = delivery[node["name"]]
        # execute the node, then if the node has out neighbours, store that content in the delivery
        if len(node["out_neighbours"]) > 0:
            for i in node["out_neighbours"]:
                delivery[i] = node["data"]["content"]
    time.sleep(2)
    return node_list

def transfer(item):
    targets = item["out_neighbours"]
    if len(targets) != 0:
        pass