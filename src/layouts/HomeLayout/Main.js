import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import {  Footer, Navbar, Header } from './components';
import './index.css';

const classNames = [
  "first-header",
  "second-header",
  "third-header"
];

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

  const index = 0;
  // const incrementIndex = () => {
  //   setIndex(index + 1);
  // }

 
    // setInterval(incrementIndex, 3000);


  const i = index % classNames.length;
  const className = classNames[i];
  return (
    <div>
      <div className={className}>
        <Navbar />
        <Header />
      </div>
      <main className={classes.content}>
        {children}
      
      </main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
