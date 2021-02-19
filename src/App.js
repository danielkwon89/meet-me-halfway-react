import logo from './logo.svg';
import './App.css';
import LocationForm from './components/LocationForm';

function App() {
  return (
    <div className="App">
      <h1>Meet Me Halfway</h1>
      <p>Discover places to eat and hangout halfway between you and a friend.</p>
      <LocationForm />
    </div>
  );
}

export default App;
