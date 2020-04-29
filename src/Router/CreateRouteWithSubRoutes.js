/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Route } from 'react-router-dom';

const CreateRouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export default CreateRouteWithSubRoutes;
