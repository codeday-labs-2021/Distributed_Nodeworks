import React, { createRef, memo, useEffect, useState } from 'react';

import { Handle } from 'react-flow-renderer';
import './dnd.css';
let letId = React.createRef()
export default memo(({ data, isConnectable }) => {
  
  const newInput = (e) => {
    console.log(e.target.value);
    data["content"] = e.target.value;
    console.log("new data: ", data)
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      
      <div className = "selector">
        <input class = "selectorInput" placeholder = "Enter a number" onChange={newInput} defaultValue={data["content"]}/>
      </div>

      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: 'red' }}
        isConnectable={isConnectable}
        onConnect={(params) => console.log('handle onConnect', params)}
      />

      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
});