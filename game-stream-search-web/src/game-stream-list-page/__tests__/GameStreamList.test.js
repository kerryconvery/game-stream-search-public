import React from 'react';
import { render, screen } from '@testing-library/react';
import GameStreamList from '../GameStreamList';
import '@testing-library/jest-dom/extend-expect';

describe('Game string list', () => {
  it('should render loading tiles when the streams are being fetched', () => {
    render(<GameStreamList fetching={true} />);

    const loadingTitles = screen.getAllByTestId('loading-tile');

    expect(loadingTitles[0]).toBeInTheDocument();
  });

  it('should render streams after the steams have been fetched and no loading tiles', () => {
    const streams = [
      {
          streamTitle: 'test stream',
          streamerName: 'test streamer',
          streamThumbnailUrl: 'http://test.stream.thumbnail.url',
          streamUrl: 'http://test.stream.url',
          streamerAvatarUrl: 'http://test.channel.thumbnail.url',
          platformName: 'test platform',
          isLive: true,
          views: 100
      }
    ]

    render(<GameStreamList streams={streams} fetching={false} />);

    const streamTile = screen.getByText('test stream');
    const loadingTitle = screen.queryByTestId('loading-tile');

    expect(streamTile).toBeInTheDocument();
    expect(loadingTitle).not.toBeInTheDocument();
  });
});