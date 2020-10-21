import React from 'react';
import { node } from 'prop-types';
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

export const getLoadingTitles = (size) => {
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

export const getStreamTiles = (streams) => (
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

const GameStreamGrid = ({ children }) => (
  <GridList cols={4} cellHeight={300} spacing={20}>
    {children}
  </GridList>
)

GameStreamGrid.propTypes = {
  children: node.isRequired,
}

export default GameStreamGrid;
