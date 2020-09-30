import { object, func } from 'prop-types';
import { createGetClientsRequest, createRegisterClientRequest } from './clientRequests';

const ApiProvider = ({ httpClient, children }) => {

  const getClientsRequest = createGetClientsRequest(httpClient);
  const registerClientRequest = createRegisterClientRequest(httpClient);

  return children({
    getClientsRequest,
    registerClientRequest,
  });
};

ApiProvider.propTypes = {
  children: func.isRequired,
  httpClient: object.isRequired,
}

export default ApiProvider;