import React, { Component } from 'react';
import LocationForm from './LocationForm';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import appLogo from '../appLogo.png';

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
                            <div className="logo-div">
                                <img 
                                    src={appLogo} 
                                    alt="Meet Me Halfway Logo" 
                                    height="350" 
                                    width="350"
                                />
                            </div>
                            <LocationForm />
                        </div>
                    </Grid>
            </ThemeProvider>
        )
    }
}