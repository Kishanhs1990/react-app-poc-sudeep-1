import React from 'react';

import './WrapperComponent.scss';

const WrapperComponent = ({ children }) => (
  <main className="wrapper">
    <div className="container">
      <div className="sub-wrapper">
        <div className="sub-container sub-container--full">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  </main>
);

export default WrapperComponent;
