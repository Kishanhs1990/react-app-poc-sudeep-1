import React from 'react';

import { ContinentsSolutionView } from '../Views/ContinentsSolution';

const ProblemComponent = React.lazy(() => import('../Components/Problem/ProblemComponent'));
const StringParserComponent = React.lazy(() =>
  import('../Components/StringParser/StringParserComponent')
);
const HelpComponent = React.lazy(() => import('../Components/Help/HelpComponent'));
const NotFoundComponent = React.lazy(() => import('../Components/NotFound/NotFoundComponent'));

const Routes = [
  {
    path: '/',
    exact: true,
    component: ProblemComponent,
  },
  {
    path: '/string-parse',
    component: StringParserComponent,
  },
  {
    path: '/continents',
    component: ContinentsSolutionView,
  },
  {
    path: '/help',
    component: HelpComponent,
  },
  {
    path: '*',
    component: NotFoundComponent,
  },
];

export default Routes;
