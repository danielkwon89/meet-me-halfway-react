import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';

class MapContainer extends Component {

    render() {
        return (
            <Map 
                google={this.props.google}
                zoom={8}
                style={mapStyle}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        )
    }
}

const mapStyle = {
    width: "100%",
    height: "100%"
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDFzxbcsq3Y8NNgqauQYdCS3fxEECqxmcY"
})(MapContainer)