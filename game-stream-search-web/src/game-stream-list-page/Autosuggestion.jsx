import React from 'react';
import { arrayOf, string, func } from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const Autosuggestion = ({ id, label, suggestions, onInputChange, onChange }) => {
  const notificationMap = {
    input: onInputChange,
    reset: onChange,
    clear: () => { onInputChange(''); onChange('') }
  }

  const notifyChange = (event, value, reason) => notificationMap[reason](value);

  return (
    <Autocomplete
      id={id}
      label={label}
      options={suggestions || []}
      variant='outlined'
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
      onInputChange={notifyChange}
    />
  )
}

Autosuggestion.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  suggestions: arrayOf(string),
  onInputChange: func.isRequired,
  onChange: func.isRequired,
};

Autosuggestion.defaultProps = {
  suggestions: [],
};

export default Autosuggestion;