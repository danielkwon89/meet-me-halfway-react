import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const API_KEY = `${process.env.REACT_APP_API_KEY}`

class MapContainer extends Component {

    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={8}
                style={mapStyle}
                initialCenter={{ lat: 47.444, lng: -122.176}}>
                <Marker position={{ lat: 48.00, lng: -122.00}} />
            </Map>
        )
    }
}

const mapStyle = {
    width: "75%",
    height: "75%"
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)