import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ui imports
import Button from '@material-ui/core/Button';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText } from '@material-ui/core';

Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`);
Geocode.enableDebug();

class LocationForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstAddress: "",
            secondAddress: "",
            pointOfInterest: "",
            transitMode: ""
        }
    }

    componentDidMount() {
        this.props.renderBusinesses()
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelect = event => {
        this.setState({
            transitMode: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.addAddresses(this.state)
        this.props.history.push('./map')
    }

    getLocation = event => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({
            ...this.state,
            firstAddress: "Searching..."
        })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = position => {
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
            (response) => {
              const address = response.results[0].formatted_address;
              this.setState({
                ...this.state,
                firstAddress: address
              })
            },
            (error) => {
              console.error(error);
            }
        );
    }

    showError = error => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
          default:
            alert("An unknown error occurred.")
        }
    }
      

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        required
                        id="outlined-helperText" 
                        label="First Address" 
                        variant="outlined"
                        margin="normal"
                        name="firstAddress"
                        style={{minWidth: 400}}
                        onChange={this.handleChange} 
                        value={this.state.firstAddress} 
                    /><br />
                    
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<MyLocationIcon/>}
                        onClick={this.getLocation.bind(this)}
                    >
                        Current Location
                    </Button><br />

                    <TextField
                        required
                        id="outlined-helperText" 
                        label="Second Address" 
                        variant="outlined"
                        margin="normal" 
                        name="secondAddress"
                        style={{minWidth: 400}}
                        onChange={this.handleChange} 
                        value={this.state.secondAddress} 
                    /><br />
                    
                    <TextField 
                        id="outlined-helperText" 
                        label="Point of Interest" 
                        variant="outlined"
                        margin="normal"
                        name="pointOfInterest"
                        style={{minWidth: 400}}
                        helperText="e.g. coffee, restaurant, hotel (or leave blank)" 
                        onChange={this.handleChange} 
                        value={this.state.pointOfInterest} 
                    /><br />

                    <FormControl
                        required
                        variant="filled"
                        style={{minWidth: 145}}
                        margin="normal"
                    >
                        <InputLabel
                            htmlFor="age-native-required"
                        >Transit Mode</InputLabel>
                        <Select
                            value={this.state.transitMode}
                            onChange={this.handleSelect}
                            autoWidth
                        >
                            <MenuItem name="transitMode" value={"DRIVING"}>Driving</MenuItem>
                            <MenuItem name="transitMode" value={"BICYCLING"}>Bicycling</MenuItem>
                            <MenuItem name="transitMode" value={"TRANSIT"}>Transit</MenuItem>
                            <MenuItem name="transitMode" value={"WALKING"}>Walking</MenuItem>

                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl><br />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        margin="normal"
                    >
                        Find Places!
                    </Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAddresses: (state) => dispatch({ type: 'ADD_ADDRESSES', state }),
        renderBusinesses: () => dispatch({type: 'RENDER_BUSINESSES'})
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LocationForm))