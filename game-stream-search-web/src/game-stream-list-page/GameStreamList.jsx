import React from 'react';
import { arrayOf, shape, string, bool, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import GameStreamDetails from './GameStreamDetails';

const useStyles = makeStyles(theme => ({
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '1rem',
    width: '100%',
    height: '100%',
  },
  details: {
    paddingLeft: '0.5rem',
    width: '80%',
    height: '80%',
  },
  subDetails: {
    width: '50%',
  },
}));

const GetLoadingTitles = (size) => {
  const classes = useStyles();
  
  const skeletonItems = [];

  for (let index = 0; index < size; index++) {
    skeletonItems.push(
      <GridListTile key={index} data-testid='loading-tile'>
          <Skeleton variant='rect' height='60%' animation='wave' />
          <div className={classes.detailsContainer}>
            <Skeleton variant='circle' width={50} height={50} animation='wave' />
            <div className={classes.details}>
              <Skeleton variant='text' animation='wave' />
              <div className={classes.subDetails}>
                <Skeleton variant='text' animation='wave' />
                <Skeleton variant='text' animation='wave' />
              </div>
            </div>
        </div>
      </GridListTile>,
    )
  }

  return skeletonItems;
}

const GetStreamTiles = (streams) => (
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
    {streams && GetStreamTiles(streams)}
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
