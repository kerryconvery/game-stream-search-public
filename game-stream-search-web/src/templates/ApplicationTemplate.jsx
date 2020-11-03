import React from 'react';
import { node } from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const ApplicationTemplate = ({ alertRenderer, children }) => (
  <Container  maxWidth="lg">
    <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} />
      <Grid item xs={12}>
        {alertRenderer}
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  </Container>
)

ApplicationTemplate.propTypes = {
  children: node.isRequired,
}

export default ApplicationTemplate;
