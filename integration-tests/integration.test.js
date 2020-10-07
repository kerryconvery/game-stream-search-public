import axios from 'axios';
import config from './config.json';

const baseUrl = config.env[process.env.APP_ENV];

describe('When posting a client', () => {
  it('should validate the request and return http status code 201 for valid requests', async () => {
    const client = {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
    };

    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'post',
      data: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toBe(201);
  });

  it('should validate the request and return http status code 400 for invalid requests', async () => {
    const client = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
    };

    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'post',
      data: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    expect(response.status).toBe(400);
  });
});

describe('When getting all clients', () => {
  it('should return a list of clients and http status code 200', async () => {
    const response = await axios({
      url: `${baseUrl}/clients`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.data.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });
});

describe('When getting a client by id', () => {
  it('should return the client matching the id and http status code 200', async () => {
    const client = {
      title: 'Mr',
      firstName: 'Fred',
      lastName: 'Jones',
      phoneNumber: '93728463',
    };

    const postResponse = await axios({
      url: `${baseUrl}/clients`,
      method: 'post',
      data: JSON.stringify(client),
      headers: { 'Content-Type': 'application/json' },
    });

    const getResponse = await axios({
      url: `${baseUrl}/clients/${postResponse.data.id}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    expect(getResponse.data.id).toEqual(postResponse.data.id);
    expect(getResponse.status).toBe(200);
  });

  it('should return http status code 404 when no clients matching the id were found', async () => {
    const response = await axios({
      url: `${baseUrl}/clients/2`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    expect(response.status).toBe(404);
  });
});
