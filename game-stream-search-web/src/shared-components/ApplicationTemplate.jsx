import React from 'react';
import { node } from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const ApplicationTemplate = ({ alertRenderer, toastRenderer, children }) => {
  return (
    <Container maxWidth='xl' disableGutters>
      <Grid container direction="column" alignItems="stretch">
        {alertRenderer}
        {toastRenderer}
        {children}
      </Grid>
    </Container>
  )
}

ApplicationTemplate.propTypes = {
  alertRenderer: node.isRequired,
  toastRenderer: node.isRequired,
  children: node.isRequired,
}

export default ApplicationTemplate;
