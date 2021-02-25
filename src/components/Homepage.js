import React, { Component } from 'react';
import LocationForm from './LocationForm';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Josefin Sans',
        'sans-serif',
      ].join(','),
    },
});

export default class Homepage extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                    <Grid 
                        container
                        spacing={0}
                        align="center"
                        justify="center"
                        direction="column"
                    >
                        <div>
                        <h1>Meet Me Halfway</h1>
                        <p>Discover places to meet and eat halfway between you and a friend.</p>
                        <LocationForm />
                        </div>
                    </Grid>
            </ThemeProvider>
        )
    }
}