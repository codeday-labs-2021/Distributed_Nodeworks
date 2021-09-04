import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
} from 'react-flow-renderer';

import Sidebar from './Sidebar.js';
import axios from 'axios';
import './dnd.css';
import localforage from 'localforage';
import ColorSelectorNode from './InputNode';
import outputNode from './OutputNode'


localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

// custom Hook for automatic abortion on unmount or dependency change
// You might add onFailure for promise errors as well.
function useAsync(asyncFn, onSuccess) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then(data => {
      if (isActive) onSuccess(data)
      else console.log("aborted setState on unmounted component")
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
}

const initBgColor = '#1A192B';

const flowKey = 'example-flow';
const nodes = JSON.parse(sessionStorage.getItem('content'));
const name = sessionStorage.getItem('contentName');
// console.log("TEST"+name);
let initialElements = [];
let id = 0;
let Save = false
if(nodes!= null){
  initialElements = nodes;
  id = sessionStorage.getItem('content-length');
  Save = true
}



const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  selectorNode: ColorSelectorNode,
  outputNum: outputNode
};
const DnDFlow = () => {
  let fileID = React.createRef()
  // if(name!=null){
  //   fileID.current.value = name
  // }
  const [bgColor, setBgColor] = useState(initBgColor);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  useEffect(() => {
    console.log(elements);
    if (elements.length > 2) {
      if (elements[elements.length - 1].source !== undefined) {
        console.log(elements[elements.length - 1]["source"]);
      }
    }
  }, [elements]);

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
    // if(type == 'selectorNode'){
    //   const connectId = ''
    // }
    console.log(type)
    var position = null;
    const newNode = {
      id: getId(),
      type,
      position: {
        x: event.clientX,
        y: event.clientY-reactFlowBounds.top
      },
      data: { label: `${type} node` },
    };
    console.log(newNode)
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
    // console.log(elements)
    let ele = JSON.stringify(elements)
    console.log(ele)
    try{
      fileID = fileID.current.value
    }
    catch{
      window.alert("ERROR",fileID)
      return
    }
    const data={
      user: sessionStorage.getItem('username'),
      node: elements,
      fileId: fileID
    }
    if(data.fileId == ""){
      console.log("EMPTY")
      window.alert("Cannot have empty file name")
      return
    }
    console.log(data)
    // HOW TO SAVE
    if(Save == true){
      axios.put('http://localhost:5000/api/v1/workflow/publish/'+sessionStorage.getItem('token'),data).then(
        res=>{
          console.log("HELLO posted" + res)
      }
      ).catch(
        err =>{
            window.alert("ERROR IN SAVED FILE")
            console.log(err);
        }
      )
    }
    else{
      axios.put('http://localhost:5000/api/v1/workflow/publish/'+sessionStorage.getItem('token'),data).then(
        res=>{
          console.log("HELLO" + res)
      }
      ).catch(
        err =>{
            window.alert("ERROR IN FILE")
            console.log(err);
        }
      ) 
    }
    //HOW TO SAVE END
    // axios.get('http://localhost:5000/api/v1/workflow/getOwner/'+localStorage.getItem('username')).then(
    //   res=>{
    //     console.log(res['data'].length)
    // }
    // ).catch(
    //   err =>{
    //       console.log(err);
    //   }
    // )
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

  const onExecute = () => {
    sendWorkflow();
    console.log("This is file id", fileID);
    axios.get('http://localhost:5000/api/v1/workflow/execute/' + `${sessionStorage.getItem('username')}-${fileID.toLowerCase()}`).then(
      res => {
        console.log(res);
      }
    ).catch(
      err =>{
        console.log(err);
      }
    )
    console.log("----------------------------------------------")
    axios.get('http://localhost:5000/api/v1/workflow/execute/get/' + `${sessionStorage.getItem('username')}-${fileID.toLowerCase()}`).then(
      res => {
        console.log(res);

      }
    ).catch(
      err =>{
        console.log(err);
      }
    )
  };

  if(sessionStorage.getItem('username')==null){
    window.location = "/login";
  }
  
  const loggedIn = () =>{
    if(nodes!= null){
      return <div class = "navBar">
      <input class="fileName" ref = {fileID} placeholder="Type Filename" value = {name}></input>
      <div class = "navObjects">
        <img src = "/./img/play-circle.svg" class= "navBtn" onClick={onExecute}></img>
        <img src = "/./img/save.svg" class= "navBtn" onClick={onSave}></img>
        <img src = "/./img/undo-alt.svg" class= "navBtn" onClick={onRestore}></img>
        <img src = "/./img/cloud-upload-alt.svg" class= "navBtn" onClick={sendWorkflow}></img>
      </div>
    </div>
    }
    return <div class = "navBar">
      <input ref = {fileID} class="fileName" placeholder="Type Filename"></input>
      <div class = "navObjects">
        <img src = "/./img/play-circle.svg" class= "navBtn" onClick={onExecute}></img>
        <img src = "/./img/save.svg" class= "navBtn" onClick={onSave}></img>
        <img src = "/./img/undo-alt.svg" class= "navBtn" onClick={onRestore}></img>
        <img src = "/./img/cloud-upload-alt.svg" class= "navBtn" onClick={sendWorkflow}></img>
      </div>
    </div>
  };
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          
          {loggedIn()}
          <ReactFlow
          
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'output') return '#ff0072';
                if (n.type === 'default') return '#1a192b';
                if(n.type === 'outputNum') return '#ff00aa';  
                if(n.type === 'selectorNode') return '#00ffc8';              
              }}
              
            />

            <Controls />
          </ReactFlow>

        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;