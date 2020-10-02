import React from 'react';
import { string, node } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'

const StandardPageTemplate = ({ title, children, actions }) => (
  <Card>
    <CardHeader title={title} action={actions} />
    <CardContent>
      {children}
    </CardContent>
  </Card>
)

StandardPageTemplate.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  actions: node,
}

StandardPageTemplate.defaultProps = {
  actions: null,
}

export default StandardPageTemplate;