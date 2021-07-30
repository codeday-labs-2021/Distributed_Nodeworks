import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  useZoomPanHelper,
  isEdge,
  MiniMap,
} from 'react-flow-renderer';
import localforage from 'localforage';

//stop undo
import ColorSelectorNode from './ColorSelectorNode';
import './index.css';

import './Save.css';
import AddNode from './AddNode';

import './App.css';

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

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
  const [bgColor, setBgColor] = useState(initBgColor);
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

  const onDrop = useCallback ((event) => {
    //event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    var position = null;
    
    const newNode = {
      id: getId(),
      type,
      position:{
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      },
      data: { label: `${type} node` },
    };
    //elements are being added
    setElements((es) => es.concat(newNode));

  },[setElements]);

  const onChange = (event) => {
    setElements((els) =>
      els.map((e) => {
        if (isEdge(e) || e.id !== '2') {
          return e;
        }

        const color = event.target.value;

        setBgColor(color);

        return {
          ...e,
          data: {
            ...e.data,
            color,
          },
        };
      })
    );
  };

  //for the save button(onClick)
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [reactFlowInstance]);

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

  const onSelectorNode = useCallback(() => {
    const SelectorNode = {
      id: getId(),
      id: '2',
        type: 'selectorNode',
        data: { onChange: onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
    };
    //elements are being added
    setElements((es) => es.concat(SelectorNode));
  },[setElements])

  const onExit = () => {
    console.log(elements)
    let ele = JSON.stringify(elements)
    console.log(ele)
  }

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
            onElementClick={onElementClick}
            onNodeDragStop={onNodeDragStop}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultZoom={1.5}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'selectorNode') return bgColor;
                if (n.type === 'output') return '#ff0072';
                if (n.type === 'default') return '#1a192b';
              }}
              nodeColor={(n) => {
                if (n.type === 'selectorNode') return bgColor;
                return '#fff';
              }}
            />

            <Controls />
            <div className="save__controls">
              <button onClick={onSave}>Save</button>
              <button onClick={onSelectorNode}>Add Selector Node</button>
              <button onClick={onRestore}>Restore</button>
              <button onClick={onExit}>Exit</button>
            </div>
          </ReactFlow>
        </div>
        <AddNode />

      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;