import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, DirectionsRenderer } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import midpointIcon from '../midpoint.png'

var polyline = require( 'google-polyline' )
var midpoint = require('polyline-midpoint')

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class Map extends Component {

    state = {}

    convertAddressesToGeocode = (firstAddress, secondAddress) => {

        let firstCoordinates;
        let secondCoordinates;

        Geocode.fromAddress(firstAddress).then(response => {
            const { lat, lng } = response.results[0].geometry.location

            firstCoordinates = {lat: lat, lng: lng}

            Geocode.fromAddress(secondAddress).then(response => {
                const { lat, lng } = response.results[0].geometry.location

                secondCoordinates = {lat: lat, lng: lng}

                const DirectionsService = new window.google.maps.DirectionsService();

                DirectionsService.route({

                    origin: new window.google.maps.LatLng(firstCoordinates.lat, firstCoordinates.lng),
                    destination: new window.google.maps.LatLng(secondCoordinates.lat, secondCoordinates.lng),
                    travelMode: window.google.maps.TravelMode.DRIVING

                }, (result, status) => {

                    if (status === window.google.maps.DirectionsStatus.OK) {

                        const midpointArr = midpoint(result.routes[0].overview_polyline).geometry.coordinates

                        this.setState({
                            ...this.state,
                            firstGeocode: firstCoordinates,
                            secondGeocode: secondCoordinates,
                            polylineMidpoint: {lat: midpointArr[1], lng: midpointArr[0]},
                            polylineCoordinates: polyline.decode(result.routes[0].overview_polyline).map(arr => {
                                return { lat: arr[0], lng: arr[1] }
                            })
                        })

                        console.log(this.state)

                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                })
            })
        },
          (error) => {
            console.error(error);
          }
      )

    }

    componentDidMount() {
        this.convertAddressesToGeocode(this.props.firstAddress, this.props.secondAddress)
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
              <Marker 
                icon={midpointIcon}
                position={this.state.polylineMidpoint}
              />
              <Polyline 
                path={this.state.polylineCoordinates}
                options={{
                    geodesic: true,
                    strokeColor: '#669DF6',
                    strokeOpacity: 1.0,
                    strokeWeight: 5
                }}
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