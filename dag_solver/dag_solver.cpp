// source: https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
// test case: https://sites.google.com/site/rajboston1951/topological-sorting-1/22

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// declare
struct Node;
struct Edge;

struct Node
{
    string name;
    vector<Node*> out_neighbors; // from this node to another node
    vector<Node*> in_neighbors; // from some other node to this node
    // vector<Edge*> edges;
};

struct Edge
{
    Node* start;
    Node* end;
};

vector<Node*> sorted;
vector<Node*> independent_nodes;
vector<Edge*> edges;

int main()
{
    Node n0, n1, n2, n3, n4, n5;

    n0 = {
        "node 0",
        {}, // from this node to another node
        {&n4, &n5} // from some other node to this node
    };

    n1 = {
        "node 1",
        {}, // from this node to another node
        {&n3, &n4} // from some other node to this node
    };

    n2 = {
        "node 2",
        {&n3}, // from this node to another node
        {&n5} // from some other node to this node
    };

    n3 = {
        "node 3",
        {&n1}, // from this node to another node
        {&n2} // from some other node to this node
    };

    n4 = {
        "node 4", 
        {&n0, &n1}, // from this node to another node
        {} // from some other node to this node
    };

    n5 = {
        "node 5", 
        {&n0, &n2}, // from this node to another node
        {} // from some other node to this node
    };

    independent_nodes.insert(independent_nodes.end(), {&n5, &n4});

    while (!independent_nodes.empty()){
        cout << "chose new independent node" << endl;
        Node* chosen_node = independent_nodes.back();
        cout << "new node name: " << chosen_node->name << endl;

        sorted.push_back(chosen_node);
        independent_nodes.pop_back();

        for (Node* i: chosen_node->out_neighbors)
        {
            cout << i->name << endl;

            cout << "Erase incoming node: " << chosen_node->name << " of " << i->name << endl;
            i->in_neighbors.erase(remove(i->in_neighbors.begin(), i->in_neighbors.end(), chosen_node),  i->in_neighbors.end());

            cout << "final look at vector of incoming neighbours dependent node: " << endl;
            for (Node* i: i->in_neighbors)
            {
                cout << i->name << " ";
            }
            cout << endl;

            if (i->in_neighbors.empty())
            {
                cout << "new independent node" << endl;
                independent_nodes.push_back(i);
            }
            cout << endl;

        }
    }

    cout << "Final resut!" << endl;
    for (Node* i: sorted)
    {
        cout << i->name << endl;
    }

    // final order (not the only solution): 4, 5, 2, 3, 1, 0
    // second solution order: 5, 2, 3, 4, 1, 0
};