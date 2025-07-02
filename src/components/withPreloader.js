import React, { useState, useEffect } from 'react';
import Preloader from '../Preloader'; // Adjust the path as needed

const withPreloader = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the delay as needed

      return () => clearTimeout(timer);
    }, []);

    return loading ? <Preloader /> : <WrappedComponent {...props} />;
  };
};

export default withPreloader;
