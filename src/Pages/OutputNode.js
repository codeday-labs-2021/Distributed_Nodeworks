import React, { memo } from 'react';

import {  
  addEdge,
  Handle,
  OnLoadParams,
  Connection,
  Position,
  Elements,
  Edge,
  OnConnectStartParams,
  NodeProps,
  NodeTypesType} from 'react-flow-renderer';
import './dnd.css';

// const onConnect = () =>{
//   console.log("connected")
// }
const isValid = (connection) =>{
  console.log("CONNECt")
  
}
const isValidConnection = (connection) => connection.target === 'selector';
const onConnect = (source,target)=>{
  console.log(target)
}
export default memo(({ data, isConnectable }) => {
  console.log("hdlfksdjf",data)
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        // isConnectable = {isConnectable}
        // isValidConnection={isValidConnection}
        onConnect={onConnect()}
        onConnectStart = {() => console.log('on connect start')}
      />
      <div className = "selector selector-Output">
        <p id = "output">{data.label}</p>
      </div>
    </>
  );
});