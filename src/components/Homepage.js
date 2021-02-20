import React, { Component } from 'react';
import LocationForm from './LocationForm';

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>Meet Me Halfway</h1>
                <p>Discover places to meet and eat halfway between you and a friend.</p>
                <LocationForm />
            </div>
        )
    }
}