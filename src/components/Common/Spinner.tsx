import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => (
  <Dimmer active>
    <Loader
      size="huge"
      content={
        'You should install metamask and Connect the geth client to private chain ...'
      }
    />
  </Dimmer>
);

export default Spinner;
