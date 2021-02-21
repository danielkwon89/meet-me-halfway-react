import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class MapContainer extends Component {

    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={8}
                style={mapStyle}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            >
                {/* add markers here (<Marker onClick={this.onMarkerClick}
                name={'Current location'} />) for origin and destination */}
            </Map>
        )
    }
}

const mapStyle = {
    width: "45%",
    height: "80%"
}

// update mapStateToProps once you set up the reducer
const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer))