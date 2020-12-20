import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import nock from 'nock';
import { ConfigurationProvider } from '../../providers/ConfigurationProvider';
import App from '../../app';
import '@testing-library/jest-dom/extend-expect';

describe('Featured channels side bar', () => {
  beforeEach(() => {
    nock('http://localhost:5000')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true' 
    })
    .get('/api/streams?pageSize=10')
    .reply(200, { items: [] });
  })

  const renderApplication = () => {
    return render(
      <ConfigurationProvider configuration={{ "streamSearchServiceUrl": "http://localhost:5000/api" }} >
        <App />
      </ConfigurationProvider>
    )
  }

  it('should display a list of Featured channels on startup', async () => {
    const channelList = {
      items: [
        {
          channelName: 'testchannel',
          streamPlatformDisplayName: 'Twitch',
          avatarUrl: '',
          channelUrl: '',
        }
      ]
    };

    nock('http://localhost:5000')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true' ,
      })
      .get('/api/channels')
      .reply(200, channelList);

    renderApplication();

    await waitFor(() => screen.getByTestId('streams-not-found'));

    const featuredChannel = await waitFor(() => screen.getByText("testchannel"));

    expect(featuredChannel).toBeInTheDocument();
  })
})
