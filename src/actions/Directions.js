import React, { Component } from 'react';

const directionsEndpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${firstAddress}&destination=${secondAddress}&mode=${transitMode}&key=${API_KEY}`

const API_KEY = `${process.env.REACT_APP_API_KEY}`

export default class Directions extends Component {

    render() {
        return (
            <div>
                Directions
            </div>
        )
    }
}
