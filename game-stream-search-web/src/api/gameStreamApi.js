import { useConfiguration } from '../providers/configurationProvider';
import axios from 'axios';

export const getStreamsRequest = (baseUrl) => (gameName, pageToken) => (
  axios({
    url: `${baseUrl}/streams`,
    method: 'GET',
    params: {
      game: gameName,
      pageSize: 25,
      pageToken: pageToken,
    },
  }).then(res => res.data)
);

export const useGameStreamApi = () => {
  const { streamSearchServiceUrl } = useConfiguration();

  return {
    getStreams: getStreamsRequest(streamSearchServiceUrl)
  }
}