import React, { Component } from 'react';
import Map from '../components/Map';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';

class MapContainer extends Component {

    render() {
        return (
            <div>
                <Map />
                {/* <BusinessesContainer /> which we will use to render each business using data from Location API */}
            </div>
        )
    }
}

export default MapContainer