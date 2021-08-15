import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import './dnd.css';
const onConnect=(params)=>{
    window.alert(params)
}
const isValidConnection=(connection)=>{
    console.log("HEL")
}
let fileID = React.createRef()
export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        isValidConnection={isValidConnection}
        isConnectable={isConnectable}
        onConnect={onConnect}
      />
      <div className = "selector selector-Output">
        <p id = "output" value = {fileID}></p>
      </div>
    </>
  );
});