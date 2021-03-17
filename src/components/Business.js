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
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

class Business extends Component {
    render() {
        // console.log(this.props.business)
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
                    title={this.props.business.name}
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