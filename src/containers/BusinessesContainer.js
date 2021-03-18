import React, { Component } from 'react';
import Business from '../components/Business';
import { connect } from 'react-redux';

// ui imports
import GridListTile from '@material-ui/core/GridListTile';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';

// icon imports
import icon_1 from '../icons/icon_1.png';
import icon_2 from '../icons/icon_2.png';
import icon_3 from '../icons/icon_3.png';
import icon_4 from '../icons/icon_4.png';
import icon_5 from '../icons/icon_5.png';
import icon_6 from '../icons/icon_6.png';
import icon_7 from '../icons/icon_7.png';
import icon_8 from '../icons/icon_8.png';
import icon_9 from '../icons/icon_9.png';
import icon_10 from '../icons/icon_10.png';
import icon_11 from '../icons/icon_11.png';
import icon_12 from '../icons/icon_12.png';
import icon_13 from '../icons/icon_13.png';
import icon_14 from '../icons/icon_14.png';
import icon_15 from '../icons/icon_15.png';
import icon_16 from '../icons/icon_16.png';
import icon_17 from '../icons/icon_17.png';
import icon_18 from '../icons/icon_18.png';
import icon_19 from '../icons/icon_19.png';
import icon_20 from '../icons/icon_20.png';

const iconObj = {
    icon_1: icon_1,
    icon_2: icon_2,
    icon_3: icon_3,
    icon_4: icon_4,
    icon_5: icon_5,
    icon_6: icon_6,
    icon_7: icon_7,
    icon_8: icon_8,
    icon_9: icon_9,
    icon_10: icon_10,
    icon_11: icon_11,
    icon_12: icon_12,
    icon_13: icon_13,
    icon_14: icon_14,
    icon_15: icon_15,
    icon_16: icon_16,
    icon_17: icon_17,
    icon_18: icon_18,
    icon_19: icon_19,
    icon_20: icon_20 
}

class BusinessesContainer extends Component {

    renderBusinesses = businesses => {
        if (businesses) {
            return businesses.map(business => {
                
                const numberedIcon = `icon_${this.props.businesses.indexOf(business) + 1}`

                return (
                <>
                <GridListTile col={1} style={{width: "100%"}}>
                    <ListItem 
                        alignItems="flex-start" 
                        hover
                        onClick={() => {
                                this.props.dispatch({type: "SELECTED_BUSINESS", business: business})
                                this.props.dispatch({type: "RENDER_BUSINESS"})
                            }
                        }
                    >
                        <ListItemAvatar>
                            <Avatar 
                                alt="business-image" 
                                src={business.image_url}
                                variant="rounded"
                                style={{height: 80, width: 80, marginRight: 7}}
                            />
                        </ListItemAvatar>
                        <img src={iconObj[numberedIcon]} width="32" height="32" />
                        <ListItemText
                            primary={
                                <>
                                    {business.name}
                                </>
                            }
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
                        <Business 
                            style={{width: "100%", height: "100%"}} 
                            business={this.props.business}
                            numberedIcon={`icon_${this.props.businesses.indexOf(this.props.business) + 1}`}
                        />
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