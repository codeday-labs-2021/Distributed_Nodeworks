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
}

export default App;
