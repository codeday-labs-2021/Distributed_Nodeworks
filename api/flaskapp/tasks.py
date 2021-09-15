import time
from flask import Flask
import json
# from flask_rq2 import RQ
from rq import get_current_job
import re
import asyncio

def check_numeric(string):
    result = re.match("[-+]?\d+$", string)
    if result is not None:
        return True
    else: 
        return False


# node structure: normal one input node only has content
# two input node will have content_1, content_2, and content (the final content)
def run_node(node):
    if node["type"] == "outputNum" or node["type"] == "outputNode":
        if node["data"]["content"]:
            node["data"]["label"] = node["data"]["content"]
    elif node["type"] == "sumNum":
        if (node["data"]["content_1"] and node["data"]["content_2"]) and check_numeric(node["data"]["content_1"]) and check_numeric(node["data"]["content_2"]):
            node["data"]["content"] = int(node["data"]["content_1"]) + int(node["data"]["content_2"])
    elif node["type"] == "subtractNum":
        if (node["data"]["content_1"] and node["data"]["content_2"]) and check_numeric(node["data"]["content_1"]) and check_numeric(node["data"]["content_2"]):
            node["data"]["content"] = int(node["data"]["content_1"]) - int(node["data"]["content_2"])


def executor(node_list, **kwargs):
    # node list is a list of dictionaries
    print("task running...")
    delivery = {} # example: {node_1: 1234}
    for node in node_list:
        if "source" not in node: # if node is a node and not an edge
            if node["id"] in delivery: # if there's an input waiting for the current node
                node["data"]["content"] = delivery[node["id"]]
            # execute the node, then if the node has out neighbours, store that content in the delivery
            run_node(node)
            if len(node["out_neighbours"]) > 0 and ("content" in node["data"]):
                for i in node["out_neighbours"]:
                    delivery[i] = node["data"]["content"]
    time.sleep(1)
    print("task done")
    return node_list


def report_result(job, connection, result, *args, **kwargs):
    return job.result