import React, { Component } from 'react';
// import Map from '../components/Map';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import BusinessesContainer from '../containers/BusinessesContainer';
import Business from '../components/Business';
import { fetchRestaurants } from '../actions/yelpActions';

// ui imports
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GridList from '@material-ui/core/GridList';

// icon imports
import midpointLogo from '../icons/midpointLogo.png';
import firstLocationIcon from '../icons/firstLocationIcon.png';
import secondLocationIcon from '../icons/secondLocationIcon.png';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

var polyline = require( 'google-polyline' )
var midpoint = require('polyline-midpoint')

class MapContainer extends Component {

    // false state will render all business, true state will render one business
    state = {renderBusiness: false}
    
    // takes the addresses from the LocationForm and converts them to coordinates
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
    
                // nested fetch requests because we need both coordinates to successfully request directions
                DirectionsService.route({
    
                    origin: new window.google.maps.LatLng(firstCoordinates.lat, firstCoordinates.lng),
                    destination: new window.google.maps.LatLng(secondCoordinates.lat, secondCoordinates.lng),
                    // grabs mode of transit from LocationForm
                    travelMode: window.google.maps.TravelMode[this.props.transitMode]
    
                }, (result, status) => {
    
                    if (status === window.google.maps.DirectionsStatus.OK) {
    
                        // uses polyline-midpoint npm package to calculate midpoint coordinates using the overview_polyline attribute from the directions service
                        const midpointArr = midpoint(result.routes[0].overview_polyline).geometry.coordinates
    
                        // sends the addresses coordinates, midpoint coordinates, and the polyline coordinates to the redux store
                        // will setting the state in the redux store prevent a re-render? (yes) fix this
                        this.setState({
                            ...this.state,
                            firstGeocode: firstCoordinates,
                            secondGeocode: secondCoordinates,
                            polylineMidpoint: {lat: midpointArr[1], lng: midpointArr[0]},
                            polylineCoordinates: polyline.decode(result.routes[0].overview_polyline).map(arr => {
                                return { lat: arr[0], lng: arr[1] }
                            })
                        })
    
                        // fetches point of interests based on midpoint coordinates and user input (from LocationForm) from the Yelp API
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
    
    // starts conversion of addresses to coordinates once component is mounted
    componentDidMount() {
        this.convertAddressesToGeocode(this.props.firstAddress, this.props.secondAddress)
    }
    
    // sets the bounds of the map around the business markers
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

    render() {

        // creates a map constant with a polyline and map markers for the first location, second location, midpoint, and business locations
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={this.state.firstGeocode}
              ref={props.onMapMounted}
            >
            {/* rendering map markers for address A, address B and midpoint */}
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
              {/* rendering map markers for fetched business data */}
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
              {/* rendering polyline from address A to address B */}
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
                {/* uses Material UI GridList to organize the UI into grids */}
                <GridList cellHeight={500} cols={2} style={{margin: 0}}>
                    <MapWithAMarker
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px`, width: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onMapMounted={this.handleMapMounted}
                    />
                    {/* TODO: try to render BusinessContainer in the GridList and pass down the fetched businesses as props to BusinessContainer for rendering */}
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
                {/* <Map /> */}
                {/* BusinessContainer should render here */}
            </div>
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


export default connect(mapStateToProps)(MapContainer)