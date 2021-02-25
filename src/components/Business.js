import React, { Component } from 'react';

export default class Business extends Component {
    render() {
        return (
            <div>
                <h3>
                    {this.props.business.name}
                </h3>
                <img src={this.props.business.image_url} width="200" />
            </div>
        )
    }
}