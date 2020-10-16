import React from 'react';
import { render } from '@testing-library/react';
import GameStreamDetails from '../GameStreamDetails';

describe('Game Stream Details', () => {
  it('should match the snapshot', () => {
    const stream = {
      streamTitle: 'test stream',
      streamerName: 'test streamer',
      streamThumbnailUrl: 'http://test.stream.thumbnail.url',
      streamUrl: 'http://test.stream.url',
      channelThumbnailUrl: 'http://test.channel.thumbnail.url',
      platformName: 'test platform',
      viewCount: 100
    }

    const { container } = render(<GameStreamDetails {...stream}  />);

    expect(container.firstChild).toMatchSnapshot();
  })
})
