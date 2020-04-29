/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Switch } from 'react-router-dom';
import CreateRouteWithSubRoutes from './CreateRouteWithSubRoutes';

const RouteSwitcher = (props) => {
  const { routes } = props;
  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <CreateRouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </>
  );
};

export default RouteSwitcher;
