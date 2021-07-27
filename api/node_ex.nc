{
  "power": {
    "type": "Node",
    "name": "Power",
    "uniquename": "power",
    "pos": [
      5069.0,
      5026.0
    ],
    "path": [
      "math",
      "Power"
    ],
    "terminals": {
      "base": {
        "value": 5.0,
        "flipped": false,
        "opts": {
          "widget": "lineedit",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": true,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "base",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "exponent": {
        "value": 5.0,
        "flipped": false,
        "opts": {
          "widget": "lineedit",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": true,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "exponent",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "result": {
        "value": 3125.0,
        "flipped": false,
        "opts": {
          "widget": "display",
          "in": false,
          "out": true,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "result",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      }
    },
    "tunnel": false,
    "forcerun": false,
    "hidden": false,
    "customState": null,
    "layer": 5
  },
  "multiply": {
    "type": "Node",
    "name": "Multiply",
    "uniquename": "multiply",
    "pos": [
      5305.0,
      5154.0
    ],
    "path": [
      "math",
      "Multiply"
    ],
    "terminals": {
      "input": {
        "value": null,
        "flipped": false,
        "opts": {
          "widget": null,
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": null,
          "flipped": false,
          "multiinput": true,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "input",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "result": {
        "value": 271875.0,
        "flipped": false,
        "opts": {
          "widget": "display",
          "in": false,
          "out": true,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "result",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      }
    },
    "tunnel": false,
    "forcerun": false,
    "hidden": false,
    "customState": null,
    "layer": 12
  },
  "connection": {
    "type": "Connection",
    "name": "connection",
    "line": "cubic",
    "uniquename": "connection",
    "input": [
      "power",
      "result"
    ],
    "output": [
      "multiply",
      "input"
    ],
    "controlpoints": []
  },
  "integer": {
    "type": "Node",
    "name": "Integer",
    "uniquename": "integer",
    "pos": [
      4985.0,
      5204.0
    ],
    "path": [
      "types",
      "Integer"
    ],
    "terminals": {
      "int": {
        "value": 87,
        "flipped": false,
        "opts": {
          "widget": "spinbox",
          "in": false,
          "out": true,
          "showlabel": false,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'int'>",
          "value": null,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "int",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      }
    },
    "tunnel": false,
    "forcerun": false,
    "hidden": false,
    "customState": null,
    "layer": 10
  },
  "connection.0": {
    "type": "Connection",
    "name": "connection.0",
    "line": "cubic",
    "uniquename": "connection.0",
    "input": [
      "integer",
      "int"
    ],
    "output": [
      "multiply",
      "input"
    ],
    "controlpoints": []
  },
  "subtract": {
    "type": "Node",
    "name": "Subtract",
    "uniquename": "subtract",
    "pos": [
      5564.0,
      5226.0
    ],
    "path": [
      "math",
      "Subtract"
    ],
    "terminals": {
      "minuend": {
        "value": 271875.0,
        "flipped": false,
        "opts": {
          "widget": "doublespinbox",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": null,
          "flipped": false,
          "multiinput": true,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "minuend",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "subtrahend": {
        "value": 15.0,
        "flipped": false,
        "opts": {
          "widget": "doublespinbox",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": null,
          "flipped": false,
          "multiinput": true,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "subtrahend",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "result": {
        "value": 271860.0,
        "flipped": false,
        "opts": {
          "widget": "display",
          "in": false,
          "out": true,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "result",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      }
    },
    "tunnel": false,
    "forcerun": false,
    "hidden": false,
    "customState": null,
    "layer": 13
  },
  "connection.1": {
    "type": "Connection",
    "name": "connection.1",
    "line": "cubic",
    "uniquename": "connection.1",
    "input": [
      "multiply",
      "result"
    ],
    "output": [
      "subtract",
      "minuend"
    ],
    "controlpoints": []
  },
  "root": {
    "type": "Node",
    "name": "Root",
    "uniquename": "root",
    "pos": [
      5257.0,
      5320.0
    ],
    "path": [
      "math",
      "Root"
    ],
    "terminals": {
      "radicand": {
        "value": 225.0,
        "flipped": false,
        "opts": {
          "widget": "doublespinbox",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": null,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "radicand",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "degree": {
        "value": 2.0,
        "flipped": false,
        "opts": {
          "widget": "doublespinbox",
          "in": true,
          "out": false,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": null,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "degree",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      },
      "result": {
        "value": 15.0,
        "flipped": false,
        "opts": {
          "widget": "display",
          "in": false,
          "out": true,
          "showlabel": true,
          "items": [],
          "min": -999999,
          "max": 999999,
          "dtype": "<class 'float'>",
          "value": 0.0,
          "flipped": false,
          "multiinput": false,
          "checkable": false,
          "columndelegate": {},
          "rowdelegate": {},
          "columns": [],
          "rows": [],
          "buttons": [
            "btn1"
          ],
          "browsetype": "open",
          "name": "result",
          "selectionBehavior": "cell",
          "selectionMode": "single"
        }
      }
    },
    "tunnel": false,
    "forcerun": false,
    "hidden": false,
    "customState": null,
    "layer": 11
  },
  "connection.2": {
    "type": "Connection",
    "name": "connection.2",
    "line": "cubic",
    "uniquename": "connection.2",
    "input": [
      "root",
      "result"
    ],
    "output": [
      "subtract",
      "subtrahend"
    ],
    "controlpoints": []
  }
}