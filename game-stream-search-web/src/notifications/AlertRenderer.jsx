import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import useEventBus from '../event-bus/eventBus';

const AlertRenderer = () => {
  const [ alerts, setAlerts ] = useState([]);

  const alertHandler = event => {
    setAlerts(alerts.concat(event));
  }

  useEventBus({ alert: alertHandler });

  return (
    alerts.map((alert, index) => {
      return <Alert key={index} severity={alert.severity}>{alert.message}</Alert>
    })
  );
}

export default AlertRenderer;