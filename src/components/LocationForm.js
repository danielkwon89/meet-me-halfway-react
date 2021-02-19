import React, { Component } from 'react';

export default class LocationForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            location_1: "location 1",
            location_2: "location 2",
            point_of_interest: "e.g. coffee"
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>Location 1: </label><br />
                    <input type="text" name="location_1" onChange={this.handleChange} value={this.state.location_1} /><br /><button>Get Current Location</button><br />
                    <label>Location 2: </label><br />
                    <input type="text" name="location_2" onChange={this.handleChange} value={this.state.location_2} /><br />
                    <label>Point of Interest: </label><br />
                    <input type="text" name="point_of_interest" onChange={this.handleChange} value={this.state.point_of_interest} /><br />
                    <input type="submit" value="Find Places!" />
                </form>
            </div>
        )
    }
}