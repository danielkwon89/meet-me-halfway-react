import React, { Component } from 'react';

export default class LocationForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            location_1: "location 1",
            location_2: "location 2",
            point_of_interest: "e.g. coffee"
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
    }

    getLocation = (event) => {
        // stopPropagation is not working as it's still triggering handleSubmit
        event.stopPropagation()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) => {
        console.log(position.coords.latitude, position.coords.longitude)
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
        }
    }
      

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Location 1: </label><br />
                    <input type="text" name="location_1" onChange={this.handleChange} value={this.state.location_1} /><br />

                    {/* Unsure if this.getLocation is functional as browser is blocking geolocation functionality */}
                    <button onClick={this.getLocation}>Get Current Location</button><br />

                    <label>Location 2: </label><br />
                    <input type="text" name="location_2" onChange={this.handleChange} value={this.state.location_2} /><br />
                    <label>Point of Interest: </label><br />
                    <input type="text" name="point_of_interest" onChange={this.handleChange} value={this.state.point_of_interest} /><br />
                    <input type="submit" value="Find Places!" />
                </form>
            </div>
        )
    }
}