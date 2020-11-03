export const getErrorAlert = () => (
  { severity: 'error', message: 'An unexpected error has occurred. Refresh your browser to try again.' }
);

export const dispatchAlert = (dispatch, alertEvent) => dispatch('alert', alertEvent);