import json

def dag_solver(json_object):

    all_nodes = {}
    independent_nodes = {}
    sorted_nodes = []

    # parsing data from the workflow file to extract all nodes
    for i in json_object:
        chosen_item = json_object[i]
        if (chosen_item["type"] == "Connection"):
            # extract the nodes from the connections
            input_node = chosen_item["input"][0]
            output_node = chosen_item["output"][0]

            if input_node not in all_nodes:
                all_nodes[input_node] = {
                    "in_neighbours" : [],
                    "out_neighbours" : [output_node]
                }
            else: # if node is already in the dictionary, then it's also the input node of another node, so update this node's out neighbour
                all_nodes[input_node]["out_neighbours"].append(output_node)

            if output_node not in all_nodes:
                all_nodes[output_node] = {
                    "in_neighbours" : [input_node],
                    "out_neighbours" : []
                }
            else:
                all_nodes[output_node]["in_neighbours"].append(input_node)

    # find all independent nodes
    for i in all_nodes:
        if len(all_nodes[i]["in_neighbours"]) == 0:
            independent_nodes[i] = {
                "in_neighbours" : [],
                "out_neighbours" : all_nodes[i]["out_neighbours"]
            }    

    while independent_nodes:
        chosen_key = independent_nodes.popitem()[0]

        # construct that chosen node
        chosen_node = {     
            "name": chosen_key, 
            "in_neighbours": all_nodes[chosen_key]["in_neighbours"],
            "out_neighbours": all_nodes[chosen_key]["out_neighbours"]
        }

        # add it to the sorted nodes
        sorted_nodes.append(json_object[chosen_node["name"]])

        for node in chosen_node["out_neighbours"]:
            all_nodes[node]["in_neighbours"].remove(chosen_key)
            if (len(all_nodes[node]["in_neighbours"]) == 0):
                independent_nodes[node] = {
                "in_neighbours" : all_nodes[node]["in_neighbours"],
                "out_neighbours" : all_nodes[node]["out_neighbours"]
            }
    return sorted_nodes


def dag_solver_flow(json_object):
    all_nodes = {}
    independent_nodes = {}
    sorted_nodes = []

    for i in json_object:
        if "type" in i:
            all_nodes[i["id"]] = {
                "type": i["type"],
                "position": i["position"],
                "data": i["data"],
                "in_neighbours" : [],
                "out_neighbours" : []
            }
    print(json_object)
    for i in json_object:
        if "source" in i: # check if the object is the connection
            input_node = i["source"]
            output_node = i["target"]

            # if input_node not in all_nodes:
            #     all_nodes[input_node] = {
            #         "in_neighbours" : [],
            #         "out_neighbours" : [output_node]
            #     }
            # else: # if node is already in the dictionary, then it's also the input node of another node, so update this node's out neighbour
            all_nodes[input_node]["out_neighbours"].append(output_node)
            
            # if output_node not in all_nodes:
            #     all_nodes[output_node] = {
            #         "in_neighbours" : [input_node],
            #         "out_neighbours" : []
            #     }
            # else:
            all_nodes[output_node]["in_neighbours"].append(input_node)
        
    print(all_nodes)

    for i in all_nodes: # make a list of independent nodes
        if len(all_nodes[i]["in_neighbours"]) == 0:
            independent_nodes[i] = {
                "type": all_nodes[i]["type"],
                "position": all_nodes[i]["position"],
                "data": all_nodes[i]["data"],
                "in_neighbours" : [],
                "out_neighbours" : all_nodes[i]["out_neighbours"]
            }    
    
    while independent_nodes: # loop through that list of independent nodes
        chosen_key = independent_nodes.popitem()[0]

        # construct that chosen node
        chosen_node = {     
            "name": chosen_key, 
            "in_neighbours": all_nodes[chosen_key]["in_neighbours"],
            "out_neighbours": all_nodes[chosen_key]["out_neighbours"],
            "type": all_nodes[chosen_key]["type"],
            "position": all_nodes[chosen_key]["position"],
            "data": all_nodes[chosen_key]["data"]
        }

        sorted_nodes.append(chosen_node)

        for node in chosen_node["out_neighbours"]:
            print(node)
            all_nodes[node]["in_neighbours"].remove(chosen_key)
            if (len(all_nodes[node]["in_neighbours"]) == 0):
                independent_nodes[node] = {
                "type": all_nodes[node]["type"],
                "position": all_nodes[node]["position"],
                "data": all_nodes[node]["data"],
                "in_neighbours" : all_nodes[node]["in_neighbours"],
                "out_neighbours" : all_nodes[node]["out_neighbours"]
            }
    return sorted_nodes
