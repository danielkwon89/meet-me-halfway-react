import React, { Component } from 'react';
import Business from '../components/Business';
// import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';

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
        // debugger
        return (
            <div>
                {this.renderBusinesses(this.props.businesses)}
            </div>
        )
    }
}

export default BusinessesContainer