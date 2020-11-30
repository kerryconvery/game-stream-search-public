import React, { useState } from 'react';
import _filter from 'lodash/filter';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import useEventBus from '../event-bus/eventBus';

const ToastRenderer = () => {
  const [ notifications, setNotifications ] = useState([]);

  const toastHandler = event => {
    setNotifications(notifications.concat(event));
  }

  const handleClose = (notificationId) => () => {
    const visibleNotifications = _filter(notifications, n => n.id !== notificationId);
    setNotifications(visibleNotifications);
  }

  useEventBus({ toast: toastHandler });
  
  return (
    notifications.map((notification) => (
      <Snackbar
        key={notification.id}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open
        open={notifications.open ? true : true}
        onClose={handleClose(notification.id)}
        autoHideDuration={3000}
        TransitionComponent={props => <Slide {...props} direction='up' />}
        message={notification.message}
      >
        <Alert severity="success">
          {notification.message}
        </Alert>
      </Snackbar>
    ))
  )
}

export default ToastRenderer;