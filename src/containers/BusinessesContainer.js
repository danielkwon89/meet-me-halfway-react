import React, { Component } from 'react';
import Business from '../components/Business';

// ui imports
import GridListTile from '@material-ui/core/GridListTile';

class BusinessesContainer extends Component {

    renderBusinesses = businesses => {
        if (businesses) {
            return businesses.map(business => {
                return <GridListTile col={1}><Business business={business} /></GridListTile>
            })
        } else {
            return <h3>"Loading Businesses..."</h3>
        }
    }

    render() {
        return (
            <div>
                {this.renderBusinesses(this.props.businesses)}
            </div>
        )
    }
}

export default BusinessesContainer