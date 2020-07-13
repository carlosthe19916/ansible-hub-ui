import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Section } from '@redhat-cloud-services/frontend-components';
import { Bullseye } from '@patternfly/react-core';

class Home extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <React.Fragment>
        <Section className='body'>
          <Bullseye className='bullseye'>
            <p>Home</p>
          </Bullseye>
        </Section>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
