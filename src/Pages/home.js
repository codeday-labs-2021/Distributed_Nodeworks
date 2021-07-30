import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
} from 'react-flow-renderer';

import Sidebar from './Sidebar.js';

import './dnd.css';
import localforage from 'localforage';
localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'example-flow';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = useCallback((event) => {
    // event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    var position = null;
    // try{
    //   var position = reactFlowInstance.project({
    //     x: event.clientX - reactFlowBounds.left,
    //     y: event.clientY - reactFlowBounds.top,
    //   });
    //   console.log(position)
    // }
    // catch{
    //   console.log("ERROR")
    //   window.location.reload()
    // }
    const newNode = {
      id: getId(),
      type,
      position: {
        x: event.clientX,
        y: event.clientY-reactFlowBounds.top
      },
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
    console.log(newNode.id);
  },[setElements]);
  
  const onSave = useCallback(() => {
    
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [reactFlowInstance]);
  const sendWorkflow = () =>{
    console.log(elements)
    let ele = JSON.stringify(elements)
    console.log(ele)
  }
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
      }
    };

    restoreFlow();
  }, [setElements]);
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
          <button onClick={onSave}>Save</button>
          <button onClick={onRestore}>Restore</button>
          <button onClick={sendWorkflow}>SEE</button>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;