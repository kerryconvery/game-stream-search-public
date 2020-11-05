export const getErrorAlert = () => (
  { severity: 'error', message: 'The application is currently offline. Please try back later.' }
);

export const dispatchAlert = (dispatch, alertEvent) => dispatch('alert', alertEvent);