import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {  Footer, Navbar, Sidebar } from './components';
import './index.css';


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div>
      <div >
        <Navbar />
      </div>
      <main className={classes.content}>
        
        <Grid
                container
                // spacing={4}
            >
                <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                >
                 <Sidebar />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                >
                  {children}
                </Grid>
            </Grid>
      </main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
