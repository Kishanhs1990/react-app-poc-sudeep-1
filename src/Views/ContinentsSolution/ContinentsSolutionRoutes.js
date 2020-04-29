import React from 'react';

const SelectContinentComponent = React.lazy(() =>
  import('../../Components/SelectContinent/SelectContinentComponent')
);
const NotFoundComponent = React.lazy(() => import('../../Components/NotFound/NotFoundComponent'));

const ContinentsSolutionRoutes = [
  {
    path: '/continents(/select-continent)?',
    exact: true,
    component: SelectContinentComponent,
  },
  {
    path: '/continents/country-details',
    component: NotFoundComponent,
  },
  {
    path: '/continents/*',
    component: NotFoundComponent,
  },
];

export default ContinentsSolutionRoutes;
