import React, { Component } from 'react';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class Directions extends Component {

    state = {
            firstGeocode: "",
            secondGeocode: "",
    }

    directionsEndpoint = "";

    convertAddressToGeocode = (address, variable) => {
        Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log("lat: ", lat, "lng: ", lng)
              this.setState({
                  ...this.state,
                  [variable]: `${lat},${lng}`
              })
            },
            (error) => {
              console.error(error);
            }
        );
    }

    componentDidMount() {
        this.convertAddressToGeocode(this.props.firstAddress, "firstGeocode");
        this.convertAddressToGeocode(this.props.secondAddress, "secondGeocode");
    }

    componentDidUpdate() {
        // debugger
        this.directionsEndpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.firstGeocode}&destination=${this.state.secondGeocode}&mode=${this.props.transitMode}&key=${API_KEY}`
        console.log(this.directionsEndpoint)
    }

    render() {

        // debugger

        return (
            <div>
                <h2>Directions</h2>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstAddress: state.firstAddress,
        secondAddress: state.secondAddress,
        transitMode: state.transitMode,
        pointOfInterest: state.pointOfInterest
    }
}

export default connect(mapStateToProps)(Directions)