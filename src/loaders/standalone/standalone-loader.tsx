// import PropTypes from 'prop-types';
import * as React from 'react';
import '../app.scss';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import '@patternfly/patternfly/patternfly.scss';
import {
  Page,
  PageHeader,
  PageSidebar,
  PageHeaderTools,
  Nav,
  NavList,
  NavItem,
  Button,
} from '@patternfly/react-core';

import { Routes } from './routes';
import Logo from '../../../static/images/galaxy_logo.svg';
import { Paths } from '../../paths';

class App extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const Header = (
      <PageHeader
        logo={
          <React.Fragment>
            <img style={{ height: '35px' }} src={Logo} alt='Galaxy Logo' />
          </React.Fragment>
        }
        headerTools={
          <PageHeaderTools>
            <Button>Login</Button>
          </PageHeaderTools>
        }
        showNavToggle
      />
    );
    const Sidebar = (
      <PageSidebar
        theme='dark'
        nav={
          <Nav theme='dark'>
            <NavList>
              <NavItem>
                <Link to={Paths.home}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to={Paths.notFound}>NotFound</Link>
              </NavItem>
            </NavList>
          </Nav>
        }
      />
    );

    return (
      <Page isManagedSidebar={true} header={Header} sidebar={Sidebar}>
        <Routes />
      </Page>
    );
  }
}

export default withRouter(App);
