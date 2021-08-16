import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import './dnd.css';


export default memo(({ data, isConnectable }) => {
  console.log("hdlfksdjf",data.label)
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <div className = "selector selector-Output">
        <p id = "output">{data.label}</p>
      </div>
    </>
  );
});