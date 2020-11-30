import { useConfiguration } from '../providers/ConfigurationProvider';
import axios from 'axios';

const StatusType = {
  Created: 'added',
  Updated: 'updated',
  Ok: 'ok',
  BadRequest: 'badRequest',
  NotFound: 'notFound',
  ServerError: 'serverError',
}

const httpStatusToStatusType = (httpStatus) => {
  switch(httpStatus) {
    case 200: return StatusType.Ok;
    case 201: return StatusType.Created;
    case 400: return StatusType.BadRequest;
    case 500: return StatusType.ServerError;
    case 404: return StatusType.NotFound;
  }
}

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
  .then(res => (
    {
      status: httpStatusToStatusType(res.status), 
      channel: res.data
    }
  ))
  .catch(error => (
    {
      status: httpStatusToStatusType(error.response.status),
      errors: error.response.data.errors,
    }
  ))
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
    StatusType,
    getStreams: getStreamsRequest(streamSearchServiceUrl),
    addChannel: addChannelRequest(streamSearchServiceUrl),
    getChannels: getChannelsRequest(streamSearchServiceUrl), 
  }
}