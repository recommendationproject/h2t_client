import React from 'react';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
      console.log(error);
      
      return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
      return null;
    }
  };
export default MyLoadingComponent;