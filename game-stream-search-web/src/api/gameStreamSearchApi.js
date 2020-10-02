import { useConfiguration } from '../providers/configurationProvider';
import axios from 'axios';

export const streamSearchRequest = (baseUrl) => gameName => (
  axios({
    url: `${baseUrl}/streams`,
    method: 'GET',
    query: {
      gameName
    },
  })
);

export const useGameStreamStreamApi = (request) => {
  const streamSearchServiceUrl = useConfiguration('streamSearchServiceUrl');

  return request(streamSearchServiceUrl);
}