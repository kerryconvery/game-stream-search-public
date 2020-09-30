import React from 'react';
import { string, node, array } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const StandardFormTemplate = ({ title, children, actions }) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>
      {children}
    </CardContent>
    <CardActions>
      {actions}
    </CardActions>
  </Card>
)

StandardFormTemplate.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  actions: node.isRequired,
}

export default StandardFormTemplate;