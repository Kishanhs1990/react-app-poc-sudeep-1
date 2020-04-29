import React from 'react';
import { Link } from 'react-router-dom';

import './HeaderComponent.scss';

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="content">
          <div className="big-header-text">
            <Link to="/">React-App-POC</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
