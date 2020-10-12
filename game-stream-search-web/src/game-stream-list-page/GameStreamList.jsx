import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import GameStreamDetails from './GameStreamDetails';

const GameStreamListSkeleton = () => (
  <Grid container spacing={3}>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={3}><Skeleton variant='text' animation={false} /></Grid>
    <Grid item xs={12}>
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
      <Skeleton variant='text' animation={false} />
    </Grid>
  </Grid>
)

const GameStreamGrid = (streams) => (
  <GridList cols={4} cellHeight={300} spacing={20}>
    {streams.map((stream, index) => (
      <GridListTile key={index}>
        <GameStreamDetails
          gameName={stream.gameName}
          streamerName={stream.streamer}
          platformName={stream.platformName}
          imageUrl={stream.imageUrl}
          streamUrl={stream.streamUrl}
          isLive={stream.isLive}
          viewCount={stream.views}
        />
      </GridListTile>
    ))}
  </GridList>
)

GameStreamGrid.propTypes = {
  gameStreams: arrayOf(shape({
    streamer: string.isRequired,
    gameName: string.isRequired,
    imageUrl: string.isRequired,
    platformName: string.isRequired,
    isLive: bool.isRequired,
    streamUrl: string.isRequired,
    views: string.isRequired,
  }))
}

GameStreamGrid.defaultProps = {
  gameStreams: null
}

export default ({ gameStreams }) => gameStreams ? GameStreamGrid(gameStreams) : GameStreamListSkeleton();
