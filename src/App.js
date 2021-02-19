import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MapContainer from './containers/MapContainer';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Meet Me Halfway</h1>
        <p>Discover places to meet and eat halfway between you and a friend.</p>
        <LocationForm />
      </div>
    </Router>
  );
}

export default App;
