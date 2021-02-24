import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`);
Geocode.enableDebug();

// add Place Autocomplete API for address input on the form

class LocationForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstAddress: "",
            secondAddress: "UCLA",
            pointOfInterest: "coffee",
            transitMode: "DRIVING"
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
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
                    <label>First Address: </label><br />
                    <input type="text" name="firstAddress" onChange={this.handleChange} value={this.state.firstAddress} /><br />
                    <button onClick={this.getLocation.bind(this)}>Get Current Location</button><br />
                    <label>Second Address: </label><br />
                    <input type="text" name="secondAddress" onChange={this.handleChange} value={this.state.secondAddress} /><br />
                    <label>Point of Interest: </label><br />
                    <input type="text" name="pointOfInterest" onChange={this.handleChange} value={this.state.pointOfInterest} /><br />
                    <label>Travel Mode: </label><br />
                    {/* turn travel mode input type from text to a clickable list */}
                    <input type="text" name="transitMode" onChange={this.handleChange} value={this.state.transitMode} /><br />
                    <input type="submit" value="Find Places!" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAddresses: (state) => dispatch({ type: 'ADD_ADDRESSES', state })
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LocationForm))