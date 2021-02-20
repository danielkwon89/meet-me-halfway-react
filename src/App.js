import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import MapContainer from './containers/MapContainer';
import Homepage from './components/Homepage';
import About from './components/About'


function App() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/About">About Us</NavLink></li>
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

export default App;
