import React, { useState, createContext, useContext } from 'react';
import { func } from 'prop-types';

const AlertContext = createContext({});

const AlertNotificationProvider = ({ children }) => {
  const [ alerts, setAlerts ] = useState([]);

  const addAlert = alert => setAlerts(alerts.concat([alert]));

  const showErrorAlert = () => {
    addAlert({ severity: 'error', message: 'An unexpected error has occurred.' });
  }

  return (
    <AlertContext.Provider value={{ showErrorAlert }}>
      {children(alerts)}
    </AlertContext.Provider>
  )
}

AlertNotificationProvider.propTypes = {
  children: func.isRequired,
}

export const useAlertNotification = () => useContext(AlertContext);
export default AlertNotificationProvider;