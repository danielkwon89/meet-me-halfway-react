import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import BusinessesContainer from '../containers/BusinessesContainer';
import Business from './Business';
import { fetchRestaurants } from '../actions/yelpActions';

// ui imports
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GridList from '@material-ui/core/GridList';

// icon imports
import midpointLogo from '../icons/midpointLogo.png';
import firstLocationIcon from '../icons/firstLocationIcon.png';
import secondLocationIcon from '../icons/secondLocationIcon.png';

var polyline = require( 'google-polyline' )
var midpoint = require('polyline-midpoint')

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class Map extends Component {

    state = {renderBusiness: false}
    

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

                        this.props.dispatch(fetchRestaurants({ term: `${this.props.pointOfInterest}`, latitude: `${this.state.polylineMidpoint.lat}`, longitude: `${this.state.polylineMidpoint.lng}` }))
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

        // if (map && this.state.firstGeocode && this.state.secondGeocode) {
        if (map && this.props.businesses) {

          const bounds = new window.google.maps.LatLngBounds()

        //   bounds.extend(this.state.firstGeocode)
        //   bounds.extend(this.state.secondGeocode)

          {this.props.businesses.map(business => 
              bounds.extend({ lat: parseFloat(`${business.coordinates.latitude}`), lng: parseFloat(`${business.coordinates.longitude}`) })
          )}

          this._map.fitBounds(bounds)
        }
    }

    handleBackButtonClick = () => {
        debugger
    }

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
              {this.props.businesses && this.props.businesses.map(business => {
                  return <Marker 
                    position={{ lat: parseFloat(`${business.coordinates.latitude}`), lng: parseFloat(`${business.coordinates.longitude}`)}}
                    onClick={() => {
                        
                        this.setState({
                            ...this.state,
                            business: business,
                            renderBusiness: true
                            })
                        }
                    }
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
            <GridList cellHeight={500} cols={2} style={{margin: 0}}>
                <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px`, width: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapMounted={this.handleMapMounted}
                />
                <GridList cellHeight={500}>
                    {this.state.renderBusiness ? 
                    <div style={{textAlign: "center"}}>
                        <Button
                        variant="contained"
                        color="default"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                renderBusiness: false
                            })
                        }}
                        >
                        Back To List
                        </Button>
                        <Business business={this.state.business} />
                    </div> : <BusinessesContainer businesses={this.props.businesses} />}
                </GridList>
            </GridList>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstAddress: state.firstAddress,
        secondAddress: state.secondAddress,
        transitMode: state.transitMode,
        pointOfInterest: state.pointOfInterest,
        businesses: state.businesses
    }
}

export default connect(mapStateToProps)(Map)