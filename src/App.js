import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Homepage from './components/Homepage';
import About from './components/About';
import React, { Component } from 'react';
import MapContainer from './containers/MapContainer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppBar, Toolbar, 
  // Link, Tab, List, ListItem, ListItemText 
} from "@material-ui/core"
import { IconButton, Button } from "@material-ui/core"
// import { Home } from "@material-ui/icons"
import ListIcon from '@material-ui/icons/List';

// const API_KEY = `${process.env.REACT_APP_API_KEY}`

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Josefin Sans',
      'sans-serif',
    ].join(','),
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                  <ListIcon />
                </IconButton>
                  <NavLink className="navlink" exact to="/" activeStyle={{ color: "white" }}>
                    <Button color="inherit">Home</Button>
                  </NavLink>
                  <NavLink className="navlink" exact to="/about" activeStyle={{ color: "white" }} inactiveStyle={{ color: "white" }}>
                    <Button color="inherit">About</Button>
                  </NavLink>
              </Toolbar>
            </AppBar>
            <div className="content">
              <Route exact path="/" component={Homepage} />
              <Route path="/about" component={About} />
              <Route path="/map" component={MapContainer} />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
