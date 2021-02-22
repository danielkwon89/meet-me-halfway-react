import React, { Component } from 'react';
import Map from '../components/Map';

export default class MapContainer extends Component {
    render() {
        return (
            <div>
                <Map />
                {/* <BusinessesContainer /> which we will use to render each business using data from Location API */}
            </div>
        )
    }
}