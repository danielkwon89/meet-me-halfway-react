import React, { Component } from 'react';

export default class Business extends Component {
    render() {
        return (
            <div>
                <h3>
                    {this.props.business.name}
                </h3>
                <img src={this.props.business.image_url} width="200" />
                <p>Address: {`${this.props.business.location.address1 || ""} ${this.props.business.location.address2 || ""} ${this.props.business.location.address3 || ""} ${this.props.business.location.city} ${this.props.business.location.zip_code}`}</p>
                <p>Phone Number: {this.props.business.display_phone}</p>
                <p>Price: {this.props.business.price}</p>
                <p>Rating: {this.props.business.rating}</p>
                <p>Review Count: {this.props.business.review_count}</p>
            </div>
        )
    }
}