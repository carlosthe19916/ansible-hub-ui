import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NotFound, Home } from '../../containers';

import { Paths } from '../../paths';

export class Routes extends React.Component<{}> {
  routes = [
    { comp: NotFound, path: Paths.notFound },
    { comp: Home, path: Paths.home },
  ];

  render() {
    return (
      <Switch>
        {this.routes.map((route, index) => (
          <Route
            key={index}
            render={() => {
              const Component = route.comp;
              return <Component />;
            }}
            path={route.path}
          ></Route>
        ))}
      </Switch>
    );
  }
}
