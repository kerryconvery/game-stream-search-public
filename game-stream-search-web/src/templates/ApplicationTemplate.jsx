import React from 'react';
import { node } from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const ApplicationTemplate = ({ children }) => (
  <Container maxWidth="lg">
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}></Grid>
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
