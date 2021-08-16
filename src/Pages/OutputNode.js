import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import './dnd.css';

let fileID = React.createRef()
export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <div className = "selector selector-Output">
        <p id = "output" value = {fileID}></p>
      </div>
    </>
  );
});