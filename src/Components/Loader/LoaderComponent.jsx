import React from 'react';

const LoaderComponent = (props) => {
  const { show } = props;
  return show ? (
    <div className="loader-overlay">
      <div className="loader-box" />
    </div>
  ) : null;
};

export default LoaderComponent;
