import React from 'react';
import Alert from '@material-ui/lab/Alert';

const AlertRenderer = ({ alerts }) => (
  alerts.map((alert, index) => {
    return <Alert key={index} severity={alert.severity}>{alert.message}</Alert>
  })
)

export default AlertRenderer;