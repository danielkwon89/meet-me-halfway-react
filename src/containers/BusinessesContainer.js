import React, { Component } from 'react';
import Business from '../components/Business';

class BusinessesContainer extends Component {

    renderBusinesses = businesses => {
        if (businesses) {
            // debugger
            return businesses.map(business => {
                return <Business business={business} />
            })
        }
    }

    render() {
        // debugger
        return (
            <div>
                <h2>BusinessesContainer</h2>
                {this.renderBusinesses(this.props.businesses)}
            </div>
        )
    }
}

export default BusinessesContainer