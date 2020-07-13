import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from '../../utilities/asyncComponent';
import some from 'lodash/some';
import { Paths } from '../../paths';

const Home = asyncComponent(() =>
  import(
    /* webpackChunkName: "not_found" */
    '../../containers/home/home'
  ),
);

const NotFound = asyncComponent(() =>
  import(
    /* webpackChunkName: "not_found" */
    '../../containers/not-found/not-found'
  ),
);

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
  const root = document.getElementById('root');
  root.removeAttribute('class');
  root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
  root.setAttribute('role', 'main');

  return <Route {...rest} component={Component} />;
};

InsightsRoute.propTypes = {
  component: PropTypes.func,
  rootClass: PropTypes.string,
};

/**
 * the Switch component changes routes depending on the path.
 *
 * Route properties:
 *      exact - path must match exactly,
 *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
 *      component - component to be rendered when a route has been chosen.
 */
export const Routes = props => {
  const path = props.childProps.location.pathname;

  return (
    <Switch>
      <InsightsRoute
        path={Paths.home}
        component={Home}
        rootClass='root'
      />
      <InsightsRoute
        path={Paths.notFound}
        component={NotFound}
        rootClass='root'
      />
      {/* Finally, catch all unmatched routes */}
      <Route
        render={() =>
          some(Paths, p => p === path) ? null : <Redirect to={Paths.notFound} />
        }
      />
    </Switch>
  );
};
