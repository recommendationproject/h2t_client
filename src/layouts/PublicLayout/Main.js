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
      <Grid container>
        <Grid  item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}>
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
                    lg={10}
                    md={10}
                    xl={10}
                    xs={10}
                >
                  {children}
                </Grid>
            </Grid>
      </main>
        </Grid>
        <Grid lg={12}
                    md={12}
                    xl={12}
                    xs={12}>
        <Footer />
        </Grid>
      </Grid>
     
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
