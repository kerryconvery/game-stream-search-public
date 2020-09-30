import React from 'react';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import StandardFormTemplate from '../../common-components/standard-form-template/standardFormTemplate';
import ClientRegistrationFormFields from './clientRegistrationFormFields';

const ClientRegistrationForm = ({ client, validationErrors, onChange, onRegister, onCancel, onValidationFailed }) => {
  
  const onRegisterClick = () => {
    const validationErrors = ClientRegistrationFormFields.validateFields(client);

    if (_.isEmpty(validationErrors)) {
      onRegister(client);
    } else {
      onValidationFailed(validationErrors);
    }
  }

  return (
    <StandardFormTemplate
      title='Client registration'
      actions={
        <>
          <Button variant='contained' color='primary' onClick={onRegisterClick}>Register</Button>
          <Button  variant='contained' color='secondary' onClick={onCancel} >Cancel</Button>
        </>
      }
    >
      <ClientRegistrationFormFields client={client} validationErrors={validationErrors} onChange={onChange} />
    </StandardFormTemplate>
  )
}

ClientRegistrationForm.propTypes = {
  ...ClientRegistrationFormFields.propTypes,
  onRegister: func.isRequired,
  onCancel: func.isRequired,
  onValidationFailed: func.isRequired,
}

export default ClientRegistrationForm;