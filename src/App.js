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
  
        <main className="form-signin">
          <BrowserRouter>
            <Route path ="/signup/" exact component={signup}/>
            <Route path ="/login/" exact component={Login}/>
            <Route path="/" exact component={()=> <Home user={this.state.user } key = {this.state.key}/> }/>
          </BrowserRouter>
        </main>
  
      </div>
    );
  }
}

