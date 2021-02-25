import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, DirectionsRenderer } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import midpointLogo from '../icons/midpointLogo.png';
import mapMarker from '../icons/mapMarker.png';
import firstLocationIcon from '../icons/firstLocationIcon.png';
import secondLocationIcon from '../icons/secondLocationIcon.png';
import BusinessesContainer from '../containers/BusinessesContainer';

var polyline = require( 'google-polyline' )
var midpoint = require('polyline-midpoint')
const axios = require('axios').default

const API_KEY = `${process.env.REACT_APP_API_KEY}`
const YELP_KEY = `${process.env.REACT_APP_YELP_KEY}`

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
                    travelMode: window.google.maps.TravelMode[this.props.transitMode]

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

                        const corsApiUrl = 'https://cors-anywhere.herokuapp.com/'

                        axios.get(`${corsApiUrl}https://api.yelp.com/v3/businesses/search?latitude=${this.state.polylineMidpoint.lat}&longitude=${this.state.polylineMidpoint.lng}`, {
                            headers: {
                                Authorization: `Bearer ${YELP_KEY}`
                            },
                            params: {
                                term: `${this.props.pointOfInterest}`,
                                radius: 5000, // radius is in meters, 5000 meters is a little over 3 miles
                                limit: 15,
                                // sort_by: distance
                            }
                        })
                        .then((res) => {
                            this.setState({
                                ...this.state,
                                businesses: res.data.businesses
                            })
                            // debugger
                        })
                        .catch((err) => {
                            console.log ('error')
                        })

                        console.log(this.state.businesses)

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

    componentDidUpdate() {
        console.log(this.state)
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

    // changeIconSize = (path, size) => {
    //     let resizedIcon = {
    //         url: path,
    //         scaledSize: new window.google.maps.Size(parseInt(size), parseInt(size)),
    //         origin: new window.google.maps.Point(0, 0),
    //         anchor: new window.google.maps.Point(0, 0)
    //     }
    //     debugger
    //     return resizedIcon
    // }

    render() {

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={this.state.firstGeocode}
              ref={props.onMapMounted}
            >
              <Marker
                icon={firstLocationIcon}
                position={this.state.firstGeocode}
              />
              <Marker
                icon={secondLocationIcon}
                position={this.state.secondGeocode}
              />
              <Marker 
                icon={midpointLogo}
                position={this.state.polylineMidpoint}
              />
              {this.state.businesses && this.state.businesses.map(business => {
                  return <Marker 
                    position={{ lat: parseFloat(`${business.coordinates.latitude}`), lng: parseFloat(`${business.coordinates.longitude}`)}}
                  />
              })}
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
            <div>
                <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px`, width: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapMounted={this.handleMapMounted}
                />
                <BusinessesContainer businesses={this.state.businesses} />
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

export default connect(mapStateToProps)(Map)