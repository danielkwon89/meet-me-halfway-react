import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Homepage from './components/Homepage';
import About from './components/About';
import React, { Component } from 'react';
import MapContainer from './containers/MapContainer';
import 'fontsource-roboto';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="navbar">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Homepage} />
            <Route path="/about" component={About} />
            <Route path="/map" component={MapContainer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
