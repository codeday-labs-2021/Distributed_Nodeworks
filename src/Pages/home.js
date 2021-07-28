import axios from 'axios';
import React, { useState, useEffect,Component } from 'react';
import ReactFlow from 'react-flow-renderer';

// //time in nodes
export default class App extends Component {
  // const [currentTime, setCurrentTime] = useState(0);
 
  // useEffect(() => {
  //   fetch('/').then(res => res.json()).then(data => {
  //     setCurrentTime(data.name);
  //   });
  // }, []);
  state = {}
  // [currentTime, setCurrentTime] = userState(0)
  componentDidMount(){
    const config = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.get('http://localhost:5000/api/v1/getuser/'+localStorage.getItem('token'),config).then(
      res=>{
        console.log(res['data']['username'])
        this.setState({user:res['data']['username']})
      },
      err=>{
        console.log(err)
      }
    )
  }

  //nodes
  render(){
    const elements = [
      {
        id: '1',
        type: 'input', // input node
        data: { label: 'Welcome ' + this.state.user},
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
        <h2>{this.state.user}</h2>
      </div>
    )
  }
}