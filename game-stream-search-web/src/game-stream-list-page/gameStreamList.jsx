import React from 'react';
import { arrayOf, shape, string, bool } from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

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

const GameStreamDetails = ({ stream }) => (
  <Grid container spacing={1}>
    <Grid item xs={3}><span>watch it on {stream.platformName}</span></Grid>
  </Grid>
)

const GameStreamGrid = ({ streams }) => (
  <GridList cols={4}>
    {streams.map(stream => (
      <GridListTile key={stream.imageUrl}>
        <a href={stream.streamUrl} target="_blank" >
          <img src={stream.imageUrl} />
          <GridListTileBar
            title={stream.gameName}
            subtitle={<GameStreamDetails stream={stream} />}
          />
        </a>
      </GridListTile>
    ))}
  </GridList>
)

const GameStreamList = (streams) => {
  const liveStreams = streams.filter(s => s.isLive);
  const recordedStreams = streams.filter(s => !s.isLive);

  return (
    <>
      <span>Live</span>
      <GameStreamGrid streams={liveStreams} />
      <br/>
      <span>Recorded</span>
      <GameStreamGrid streams={recordedStreams} />
    </>
  )
}

GameStreamList.propTypes = {
  gameStreams: arrayOf(shape({
    gameName: string.isRequired,
    imageUrl: string.isRequired,
    platformName: string.isRequired,
    isLive: bool.isRequired,
    streamUrl: string.isRequired
  }))
}

GameStreamList.defaultProps = {
  gameStreams: null
}

export default ({ gameStreams }) => gameStreams ? GameStreamList(gameStreams) : GameStreamListSkeleton();
