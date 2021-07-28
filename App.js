import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  useZoomPanHelper,
} from 'react-flow-renderer';
import localforage from 'localforage';

import './Save.css';
import AddNode from './AddNode';

import './App.css';

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
  //save button
  const [rfInstance, setRfInstance] = useState(null);
  
  //dndflow
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

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };
    //elements are being added
    setElements((es) => es.concat(newNode));
    
    console.log();
  };
  //for the save button(onClick)
  const onSave = useCallback(() => {
    console.log("Hello");
    console.log(elements);
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    console.log("restore");
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        // transform({ x, y, zoom: flow.zoom || 0 });
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
            <div className="save__controls">
              <button onClick={onSave}>Save</button>
              <button onClick={onRestore}>Resotre</button>
            </div>
          </ReactFlow>
        </div>
        <AddNode />

      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;