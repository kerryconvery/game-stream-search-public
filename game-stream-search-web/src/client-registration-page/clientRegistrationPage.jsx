import React, { useState } from 'react';
import { func } from 'prop-types';
import ClientRegistrationForm from './client-registration-form/clientRegistrationForm';
import { useNavigation } from '../navigation';

const ClientRegistrationPage = ({ registerClient }) => {
  const [ client, setClient ] = useState({});
  const [ validationErrors, setValidationErrors ] = useState({});
  const navigate = useNavigation();

  const onRegister = async () => {
    await registerClient(client);
    navigate.toClientManagement();
  };
  
  return (
    <ClientRegistrationForm
      client={client}
      validationErrors={validationErrors}
      onChange={setClient} 
      onRegister={onRegister}
      onCancel={navigate.toClientManagement}
      onValidationFailed={setValidationErrors}
    />
  )
}
ClientRegistrationPage.propTypes = {
  registerClient: func.isRequired,
}

export default ClientRegistrationPage;