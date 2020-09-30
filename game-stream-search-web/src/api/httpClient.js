import axios from 'axios';

export default (baseURL) => {
  const instance = axios.create({ baseURL });

  return {
    get: request => instance({
      url: request.url,
      method: 'GET',
    }),
    post: request => instance({
      url: request.url,
      method: 'POST',
      data: request.body
    })
  }
};