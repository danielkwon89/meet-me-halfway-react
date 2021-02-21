import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import MapContainer from './containers/MapContainer';
import Homepage from './components/Homepage';
import About from './components/About';
import Directions from './actions/Directions';

function App() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/directions">Directions</NavLink></li>
        </ul>
        <div className="content">
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={About} />
          <Route path="/map" component={MapContainer} />
          <Route path="/directions" component={Directions} />
        </div>
      </div>
    </Router>
  );
}

export default App;
