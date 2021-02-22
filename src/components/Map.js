import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class Map extends Component {

    state = {
        firstGeocode: "",
        secondGeocode: "",
    }

    directionsEndpoint = "";

    convertAddressToGeocode = (address, variable) => {
        Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              this.setState({
                  ...this.state,
                [variable]: {lat: lat, lng: lng}
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
        // this.directionsEndpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.firstGeocode.lat},${this.state.firstGeocode.lng}&destination=${this.state.secondGeocode.lat},${this.state.secondGeocode.lng}&mode=${this.props.transitMode}&key=${API_KEY}`
        // console.log(this.directionsEndpoint)

        // const bounds = new window.google.maps.LatLngBounds()
        // bounds.extend(new window.google.maps.LatLng(
        //     this.state.firstGeocode.lat,
        //     this.state.firstGeocode.lng
        // ))
        // bounds.extend(new window.google.maps.LatLng(
        //     this.state.secondeocode.lat,
        //     this.state.secondGeocode.lng
        // ))
        // this.ref.map.fitBounds(bounds)
    }

    handleMapMounted = (map) => {
        this._map = map
        if (map && this.state.firstGeocode && this.state.secondGeocode) {
          const bounds = new window.google.maps.LatLngBounds()

          bounds.extend(this.state.firstGeocode)
          bounds.extend(this.state.secondGeocode)
          
          this._map.fitBounds(bounds)
        }
    }

    render() {

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={this.state.firstGeocode}
              ref={props.onMapMounted}
            >
              <Marker
                position={this.state.firstGeocode}
              />
              <Marker
                position={this.state.secondGeocode}
              />
            </GoogleMap>
            )
        )

        return (
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                onMapMounted={this.handleMapMounted}
            />
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

export default connect(mapStateToProps)(Map)