import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import BusinessesContainer from '../containers/BusinessesContainer';
import { fetchRestaurants } from '../actions/yelpActions';

// ui imports
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';

// icon imports
import midpointLogo from '../icons/midpointLogo.png';
import mapMarker from '../icons/mapMarker.png';
import icon_1 from '../icons/icon_1.png';
import icon_2 from '../icons/icon_2.png';
import icon_3 from '../icons/icon_3.png';
import icon_4 from '../icons/icon_4.png';
import icon_5 from '../icons/icon_5.png';
import icon_6 from '../icons/icon_6.png';
import icon_7 from '../icons/icon_7.png';
import icon_8 from '../icons/icon_8.png';
import icon_9 from '../icons/icon_9.png';
import icon_10 from '../icons/icon_10.png';
import icon_11 from '../icons/icon_11.png';
import icon_12 from '../icons/icon_12.png';
import icon_13 from '../icons/icon_13.png';
import icon_14 from '../icons/icon_14.png';
import icon_15 from '../icons/icon_15.png';
import icon_16 from '../icons/icon_16.png';
import icon_17 from '../icons/icon_17.png';
import icon_18 from '../icons/icon_18.png';
import icon_19 from '../icons/icon_19.png';
import icon_20 from '../icons/icon_20.png';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

var polyline = require( 'google-polyline' )
var midpoint = require('polyline-midpoint')

const iconObj = {
    icon_1: icon_1,
    icon_2: icon_2,
    icon_3: icon_3,
    icon_4: icon_4,
    icon_5: icon_5,
    icon_6: icon_6,
    icon_7: icon_7,
    icon_8: icon_8,
    icon_9: icon_9,
    icon_10: icon_10,
    icon_11: icon_11,
    icon_12: icon_12,
    icon_13: icon_13,
    icon_14: icon_14,
    icon_15: icon_15,
    icon_16: icon_16,
    icon_17: icon_17,
    icon_18: icon_18,
    icon_19: icon_19,
    icon_20: icon_20 
}

class MapContainer extends Component {

    // false state will render all business, true state will render one business
    state = {}
    
    // takes the addresses from the LocationForm and converts them to coordinates
    fetchData = (firstAddress, secondAddress) => {

        this.props.dispatch({ type: 'LOADING_RESTAURANTS' })

        let firstCoordinates;
        let secondCoordinates;
    
        Geocode.fromAddress(firstAddress).then(response => {
            const { lat, lng } = response.results[0].geometry.location
    
            firstCoordinates = {lat: lat, lng: lng}
    
            Geocode.fromAddress(secondAddress).then(response => {
                const { lat, lng } = response.results[0].geometry.location
    
                secondCoordinates = {lat: lat, lng: lng}
    
                const DirectionsService = new window.google.maps.DirectionsService();
    
                // nested fetch requests because we need both coordinates to complete fetching before requesting directions
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
        this.fetchData(this.props.firstAddress, this.props.secondAddress)
    }

    componentDidUpdate(prevProps) {
        if (this.props.pointOfInterest !== prevProps.pointOfInterest) {
            this.fetchData(this.props.firstAddress, this.props.secondAddress)
        }
    }
    
    // sets the bounds of the map around the business markers
    handleMapMounted = (map) => {
    
        this._map = map
    
        if (map && this.state.firstGeocode && this.state.secondGeocode) {
        // if (map && this.props.businesses) {
    
            const bounds = new window.google.maps.LatLngBounds()
    
              bounds.extend(this.state.firstGeocode)
              bounds.extend(this.state.secondGeocode)
    
            // {this.props.businesses.map(business => 
            //     bounds.extend({ lat: parseFloat(`${business.coordinates.latitude}`), lng: parseFloat(`${business.coordinates.longitude}`) })
            // )}
    
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
                icon={new window.google.maps.MarkerImage(
                    mapMarker, null, null, null,
                    new window.google.maps.Size(40, 40)
                )}
                position={this.state.firstGeocode}
              />
              <Marker
                icon={new window.google.maps.MarkerImage(
                    mapMarker, null, null, null,
                    new window.google.maps.Size(40, 40)
                )}
                position={this.state.secondGeocode}
              />
              <Marker 
                icon={new window.google.maps.MarkerImage(
                    midpointLogo, null, null, null, 
                    new window.google.maps.Size(65, 65)
                )}
                position={this.state.polylineMidpoint}
              />
              {/* rendering map markers for fetched business data */}
              {this.props.businesses && this.props.businesses.map(business => {
                  const numberedIcon = `icon_${this.props.businesses.indexOf(business) + 1}`
                  return (
                    <Marker 
                        icon={new window.google.maps.MarkerImage(
                            iconObj[numberedIcon], null, null, null, 
                            new window.google.maps.Size(35, 35)
                        )}
                        position={{ lat: parseFloat(`${business.coordinates.latitude}`), lng: parseFloat(`${business.coordinates.longitude}`)}}
                        onClick={() => {
                                this.props.dispatch({type: "SELECTED_BUSINESS", business: business})
                                this.props.dispatch({type: "RENDER_BUSINESS"})
                            }
                        }
                    />
                  )
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
                <GridList cellHeight={580} cols={2} style={{margin: 0}}>
                    {this.props.loading ? <h3>Loading...</h3> : <MapWithAMarker
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `580px`, width: `50%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onMapMounted={this.handleMapMounted}
                    />}
                    <GridList cellHeight={580}>
                        <BusinessesContainer businesses={this.props.businesses} />
                    </GridList>
                </GridList>
                
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
        businesses: state.businesses,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(MapContainer)