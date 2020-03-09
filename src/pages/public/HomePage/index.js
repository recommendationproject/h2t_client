import React from 'react';
import './main.css';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
    Product
} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)

    }
}));

const Homepage = () => {
    const classes = useStyles();


    return (

        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                 
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                >
                    <Product />
                </Grid>
            </Grid>
        </div>

    );
}


const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);