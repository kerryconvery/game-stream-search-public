import { useConfiguration } from '../providers/configurationProvider';
import axios from 'axios';

export const streamSearchRequest = (baseUrl) => gameName => (
  axios({
    url: `${baseUrl}/streams`,
    method: 'GET',
    params: {
      game: gameName
    },
  }).then(res => res.data)
);

export const useGameStreamStreamApi = (request) => {
  const { streamSearchServiceUrl } = useConfiguration();

  return request(streamSearchServiceUrl);
}