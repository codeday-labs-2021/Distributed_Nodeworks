

class Node:
    def __init__(self, name, in_neighbours, out_neighbours):
        self.name = name
        self.out_neighbours = out_neighbours
        self.in_neighbours = in_neighbours

    def is_independent(self, in_neighbours):
        if (len(in_neighbours) == 0):
            return True
        else:
            return False

    def set_in_neighbours(self, *nodes):
        for node in nodes:
            self.in_neighbours.append(node)

    def set_out_neighbours(self, *nodes):
        for node in nodes:
            self.out_neighbours.append(node)

    def set_name(self, value):
        self.name = value

    def __repr__(self):
        return self.name


def dag_solve(json_object):
    # test:
    # default declaration
    print(json_object)
    n0 = Node("Undeclared", [], [])
    n1 = Node("Undeclared", [], [])
    n2 = Node("Undeclared", [], [])
    n3 = Node("Undeclared", [], [])
    n4 = Node("Undeclared", [], [])
    n5 = Node("Undeclared", [], [])

    n0.set_name("Node 0")
    n0.set_in_neighbours(n4, n5)

    n1.set_name("Node 1")
    n1.set_in_neighbours(n4, n3)

    n2.set_name("Node 2")
    n2.set_in_neighbours(n5)
    n2.set_out_neighbours(n3)

    n3.set_name("Node 3")
    n3.set_in_neighbours(n2)
    n3.set_out_neighbours(n1)

    n4.set_name("Node 4")
    n4.set_out_neighbours(n0, n1)

    n5.set_name("Node 5")
    n5.set_out_neighbours(n0, n2)

    sorted_nodes = []
    independent_nodes = [n4, n5]

    while (len(independent_nodes) != 0):
        print("Starting...")
        chosen_node = independent_nodes.pop()
        print("Choosing independent node " + chosen_node.name)
        sorted_nodes.append(chosen_node)
        for node in chosen_node.out_neighbours:
            print("Dependency: " + node.name)
            node.in_neighbours.remove(chosen_node)
            print(node.in_neighbours)
            if (len(node.in_neighbours) == 0):
                independent_nodes.append(node)
                print(node.name + " is independent")
            else:
                print("Not independent")

    print("Result: ")
    for node in sorted_nodes:
        print(node.name)
