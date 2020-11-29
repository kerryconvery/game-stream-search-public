import { useConfiguration } from '../providers/ConfigurationProvider';
import axios from 'axios';

const getStreamsRequest = (baseUrl) => (filters = {}, pageToken) => (
  axios({
    url: `${baseUrl}/streams`,
    method: 'GET',
    params: {
      game: filters.gameName,
      pageSize: 10,
      pageToken: pageToken,
    },
  }).then(res => res.data)
);

const addChannelRequest = (baseUrl) => (data) => (
  axios({
    url: `${baseUrl}/channels/${data.streamPlatform}/${data.channelName}`,
    method: 'PUT',
  })
  .then(res => res.data)
  .catch(error => error.response.data)
)

const getChannelsRequest = (baseUrl) => () => (
  axios({
    url: `${baseUrl}/channels`,
    method: 'GET',
    params: {},
  }).then(res => res.data.items)
);

export const useGameStreamApi = () => {
  const { streamSearchServiceUrl } = useConfiguration();

  return {
    getStreams: getStreamsRequest(streamSearchServiceUrl),
    addChannel: addChannelRequest(streamSearchServiceUrl),
    getChannels: getChannelsRequest(streamSearchServiceUrl), 
  }
}