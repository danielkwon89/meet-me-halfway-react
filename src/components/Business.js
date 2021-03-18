import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';

// ui imports
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import PhoneIphoneTwoToneIcon from '@material-ui/icons/PhoneIphoneTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import LabelTwoToneIcon from '@material-ui/icons/LabelTwoTone';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

class Business extends Component {
    render() {
        return (
            <Card>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => this.props.dispatch({type: "RENDER_BUSINESSES"})}
                    >Back To List
                </Button>
                <CardHeader
                    title={
                        <>
                            <img 
                                src={iconObj[this.props.numberedIcon]} 
                                width="30" 
                                height="30"
                            />
                            {" "}
                            {this.props.business.name}
                        </>
                        }
                    subheader={
                        <>
                            <Rating
                                defaultValue={parseFloat(this.props.business.rating)}
                                precision={0.5}
                                size="small"
                                readOnly
                            />
                            {" "}{this.props.business.review_count} reviews
                        </>
                    }
                />
                <CardMedia>
                    <img src={this.props.business.image_url} width="200" />
                </CardMedia>
                <CardContent>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                    >
                        <LocationOnTwoToneIcon fontSize="small" />{" "}{`${this.props.business.location.address1 || ""} ${this.props.business.location.address2 || ""} ${this.props.business.location.address3 || ""} ${this.props.business.location.city} ${this.props.business.location.zip_code}`}
                        <br/>
                        <PhoneIphoneTwoToneIcon fontSize="small" />{" "}{this.props.business.display_phone}
                        <br/>
                        <PublicTwoToneIcon fontSize="small" />{" "}
                        <a target="_blank" href={this.props.business.url}>View On Yelp</a>
                        <br/>
                        <LabelTwoToneIcon fontSize="small" />{" "}{this.props.business.categories.map(category => {
                            return this.props.business.categories.indexOf(category) === this.props.business.categories.length-1 ? `${category.title}` : `${category.title}, `
                            }
                        )}{this.props.business.price ? ` · ${this.props.business.price}` : ""}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default connect(null, null)(Business)