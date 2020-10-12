import React from 'react';
import { string, bool, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    'font-family': 'Helvetica',
    color: '#231E1D',
  },
  streamTitle: {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    fontSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'normal',
    marginBottom: '0.25rem',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  detailsContainer: {
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem'
  },
  streamDetails: {
    color: '#606060',
    fontSize: '14px',
  }
}));

const GameStreamDetails = ({ imageUrl, streamUrl, gameName, streamerName, platformName, isLive, viewCount }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a href={streamUrl} target='_blank' className={classes.link}>
        <img src={imageUrl} />
        <div className={classes.detailsContainer}>
          <h3 className={classes.streamTitle}>{gameName}</h3>
            <div className={classes.streamDetails}>
              <div>{streamerName}</div>
              <span>{platformName}</span>
              <span> • </span>
              <span>{isLive ? `${viewCount} viewers` : `${viewCount} views` }</span>
            </div>
          </div>
        </a>
    </div>
  )
}

GameStreamDetails.propTypes = {
  gameName: string.isRequired,
  streamerName: string.isRequired,
  platformName: string.isRequired,
  imageUrl: string.isRequired,
  streamUrl: string.isRequired,
  isLive: bool.isRequired,
  viewCount: number.isRequired,
}

export default GameStreamDetails;