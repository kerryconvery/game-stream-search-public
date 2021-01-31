import axios from 'axios';
import config from './config.json';

const baseUrl = config.env[process.env.APP_ENV];

describe('When getting live streams', () => {
  it('should return http status code 200 and one stream from each provider', async () => {
    const response = await axios({
      url: `${baseUrl}/streams?pageSize=1`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toEqual(200);
    expect(response.data.items.length).toEqual(3);
  });

  it('should return http status code 200 when getting channels, if any', async () => {
    const response = await axios({
      url: `${baseUrl}/channels`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toEqual(200);
  });
});
