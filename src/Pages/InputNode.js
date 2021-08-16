import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import './dnd.css';
const onConnect=()=>{
  window.alert('HELLO')
}
// const isValidConnection=()=>
export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      {/* <div className = "selector">
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div> */}
      <div className = "selector">
        <input class = "selectorInput" placeholder = "Enter a number"></input>
      </div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: 'red' }}
        isConnectable={isConnectable}
        onConnect={onConnect}
        // isValidConnection={isValidConnection}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
        onConnect={onConnect}
      />
    </>
  );
});