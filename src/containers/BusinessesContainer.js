import React, { Component } from 'react';
import Business from '../components/Business';
import { connect } from 'react-redux';

// ui imports
import GridListTile from '@material-ui/core/GridListTile';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

class BusinessesContainer extends Component {

    renderBusinesses = businesses => {
        if (businesses) {
            return businesses.map(business => {
                return (
                <>
                <GridListTile col={1} style={{width: "100%"}}>
                    <ListItem alignItems="flex-start" hover>
                        <ListItemAvatar>
                            <Avatar 
                                alt="business-image" 
                                src={business.image_url}
                                variant="rounded"
                                style={{height: 80, width: 80, marginRight: 7}}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={business.name}
                            secondary={
                                <>
                                    {business.location.address1 || ""} {business.location.address2 || ""}{business.location.address3 || ""} {business.location.city} {business.location.zip_code}
                                    <br/>
                                    {business.categories.map(category => {
                                        return business.categories.indexOf(category) === business.categories.length-1 ? `${category.title}` : `${category.title}, `
                                    }
                                    )}
                                    <br/>
                                    <Rating
                                        defaultValue={parseFloat(business.rating)}
                                        precision={0.5}
                                        size="small"
                                        readOnly
                                    />
                                    {" "}{business.review_count}{" "}{business.review_count === 1 ? "review" : "reviews"}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider />
                </GridListTile>
                </>
                )
            })
        } else {
            return <h3>"Loading Businesses..."</h3>
        }
    }

    render() {
        return (
            <>
                {this.props.renderBusiness ? 
                    <div style={{textAlign: "center", width: "100%"}}>
                        <Business style={{width: "100%", height: "100%"}} business={this.props.business} />
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

export default connect(mapStateToProps, null)(BusinessesContainer)