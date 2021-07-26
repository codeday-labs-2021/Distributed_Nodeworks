import React, { useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';

// //time in nodes
function App() {
  const [currentTime, setCurrentTime] = useState(0);
 
  useEffect(() => {
    fetch('/').then(res => res.json()).then(data => {
      setCurrentTime(data.name);
    });
  }, []);


  //nodes
  let elements = [
    {
      id: '1',
      type: 'input', // input node
      data: { label: 'Welcome' + {currentTime} },
      position: { x: 250, y: 25 },
    },
    // default node
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div>},
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
  ];

  return (
    <div style={{ height: 600 }}>
      <ReactFlow elements={elements} />
    </div>
  )
}
export default App;