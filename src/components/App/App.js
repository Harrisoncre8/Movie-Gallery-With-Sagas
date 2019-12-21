import React, { Component } from 'react';
import './App.css';
import Home from '../Home/Home';
import Detail from '../Detail/Detail';
import { HashRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
        <Route exact path='/' component={ Home } />
        <Route path='/details' component={ Detail } />
        </Router>
      </div>
    );
  }
}

export default App;
