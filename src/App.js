import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login'
import Nav from './Component/Nav';
import {BrowserRouter, Route} from 'react-router-dom'
import signup from './Pages/Signup';
import home from './Pages/home';

function App() {
  return (
    <div className="App">
      <Nav/>

      <main className="form-signin">
        <BrowserRouter>
          <Route path ="/signup/" exact component={signup}/>
          <Route path ="/login/" exact component={Login}/>
          <Route path="/" exact component={home}/>
        </BrowserRouter>
      </main>

    </div>
  );
}

export default App;
