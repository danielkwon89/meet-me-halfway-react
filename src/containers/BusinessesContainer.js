import React, { Component } from 'react';
import Business from '../components/Business';
import { connect } from 'react-redux';

// ui imports
import GridListTile from '@material-ui/core/GridListTile';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
            <>
                {this.props.renderBusiness ? 
                    <div style={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => this.props.dispatch({type: "RENDER_BUSINESSES"})}
                        >Back To List
                        </Button>
                        <Business business={this.props.business} />
                    </div> : this.renderBusinesses(this.props.businesses)}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        business: state.business,
        renderBusiness: state.renderBusiness
    }
}

export default connect(mapStateToProps)(BusinessesContainer)