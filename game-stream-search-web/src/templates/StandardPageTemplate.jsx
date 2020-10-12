import React from 'react';
import { node } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: '#F8F9F9'
  },
}));

const StandardPageTemplate = ({ toolBar, children }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item direction="row" container justify="center" alignItems="stretch">
        {toolBar}
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {children}
      </Grid>
    </Grid>
  )
}

StandardPageTemplate.propTypes = {
  toolBar: node,
  children: node.isRequired,
}

export default StandardPageTemplate;
