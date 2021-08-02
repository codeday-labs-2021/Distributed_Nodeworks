<<<<<<< HEAD
import React, { useState, useEffect} from 'react';
import Register from './components/Register';
import logo from './logo.svg';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p> React App </p>
      </header>

      <div>
        <Register/>
      </div>

      <div style={{height: 100}}/>
    </div>
  );
=======
import React, { useState, useEffect, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login'
import Nav from './Component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import signup from './Pages/Signup';
import Home from './Pages/home';
import axios from 'axios';
export default class App extends Component{
  state ={}
  componentDidMount= ()=>{
    const config = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.get('http://localhost:5000/api/v1/getuser/'+localStorage.getItem('token'),config).then(
      res=>{
        console.log(res['data']['username'])
        this.setState({user:res['data']['username'],
                      key: res['data']['user_key']})
      },
      err=>{
        console.log(err)
      }
    )
  }
  render(){
    return (
      <div className="App">
        <Nav/>
        <BrowserRouter>
          <main className="form-signin">
            <Route path ="/signup/" exact component={signup}/>
            <Route path ="/login/" exact component={Login}/>
          </main>
          <Route path="/" exact component={()=> <Home user={this.state.user } key = {this.state.key}/> }/>
        </BrowserRouter>
      </div>
    );
  }
>>>>>>> dc526f6f413caf84a5c6555071169b6015e70d76
}

