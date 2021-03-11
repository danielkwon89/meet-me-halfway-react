import React, { Component } from 'react';
import Map from '../components/Map';

class MapContainer extends Component {
    // move map logic here and pass down any business info to BusinessContainer as props
    render() {
        return (
            <div>
                <Map />
                {/* BusinessContainer should render here */}
            </div>
        )
    }
}

export default MapContainer