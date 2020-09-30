import React from 'react';
import { shape, string, func } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

const validateFields = (client) => {
  const validationErrors = {};

  if (_.isEmpty(client.title)) {
    validationErrors.title = 'Please choose a title'
  }

  if (_.isEmpty(client.firstName)) {
    validationErrors.firstName = 'Please enter a first name'
  }

  if (_.isEmpty(client.lastName)) {
    validationErrors.lastName = 'Please enter a last name'
  }

  if (_.isEmpty(client.phoneNumber)) {
    validationErrors.phoneNumber = 'Please enter a phone number'
  }

  return validationErrors;
}

const ClientRegistrationFormFields = ({ client, validationErrors, onChange }) => {

  const onInputChange = fieldName => (event) => {
    const newClient = { ...client };
    newClient[fieldName] = event.target.value;
    onChange(newClient);
  }

  return (
    <FormControl component="fieldset" fullWidth>
      <FormControl>
        <TextField
          label="Title"
          id="title"
          select
          defaultValue=""
          size="small"
          error={!_.isEmpty(validationErrors.title)}
          helperText={validationErrors.title || "Required"}
          onChange={onInputChange('title')}
        >
          <MenuItem value='Mr'>Mr</MenuItem>
          <MenuItem value='Mrs'>Mrs</MenuItem>
          <MenuItem value='Miss'>Miss</MenuItem>
          <MenuItem value='Ms'>Ms</MenuItem>
        </TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="first-name"
          label="First name"
          inputProps={{ maxLength: 50 }}
          error={!_.isEmpty(validationErrors.firstName)}
          helperText={validationErrors.firstName || "Required"}
          onChange={onInputChange('firstName')}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="last-name"
          label="Last name"
          inputProps={{ maxLength: 50 }}
          error={!_.isEmpty(validationErrors.lastName)}
          helperText={validationErrors.lastName || "Required"}
          onChange={onInputChange('lastName')}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="phone-number"
          label="Phone number"
          inputProps={{ maxLength: 10 }}
          error={!_.isEmpty(validationErrors.phoneNumber)}
          helperText={validationErrors.phoneNumber || "Required"}
          onChange={onInputChange('phoneNumber')}
        />
      </FormControl>
    </FormControl>
  )
}

ClientRegistrationFormFields.validateFields = validateFields;

ClientRegistrationFormFields.propTypes = {
  client: shape({
    title: string,
    firstName: string,
    lastName: string,
    phone: string,
  }).isRequired,
  validationErrors: shape({}).isRequired,
  onChange: func.isRequired,
}

export default ClientRegistrationFormFields;