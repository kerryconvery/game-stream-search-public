import React from 'react';
import { arrayOf, shape, string, bool, number } from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import GameStreamDetails from './GameStreamDetails';

const GetLoadingTitles = (size) => {
  const skeletonItems = [];

  for (let index = 0; index < size; index++) {
    skeletonItems.push(
      <GridListTile key={index} data-testid='loading-tile'>
        <Skeleton variant='rect' height='100%' animation='wave' />
      </GridListTile>,
    )
  }

  return skeletonItems;
}

const GetGameStreamTiles = (streams) => (
  streams.map((stream, index) => (
    <GridListTile key={index}>
      <GameStreamDetails
        streamTitle={stream.streamTitle}
        streamerName={stream.streamerName}
        platformName={stream.platformName}
        streamThumbnailUrl={stream.streamThumbnailUrl}
        streamUrl={stream.streamUrl}
        streamerAvatarUrl={stream.streamerAvatarUrl}
        isLive={stream.isLive}
        viewCount={stream.views}
      />
    </GridListTile>
  ))
)

const GameStreamList = ({ streams, fetching }) => (
  <GridList cols={4} cellHeight={300} spacing={20}>
    {streams && GetGameStreamTiles(streams)}
    {fetching && GetLoadingTitles(6)}
  </GridList>
)

GameStreamList.propTypes = {
  streams: arrayOf(shape({
    streamerName: string.isRequired,
    streamTitle: string.isRequired,
    streamThumbnailUrl: string.isRequired,
    streamerAvatarUrl: string.isRequired,
    platformName: string.isRequired,
    isLive: bool.isRequired,
    streamUrl: string.isRequired,
    views: number.isRequired,
  })),
  fetching: bool.isRequired,
}

GameStreamList.defaultProps = {
  streams: null
}

export default GameStreamList;
