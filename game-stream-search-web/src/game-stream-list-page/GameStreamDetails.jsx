import React from 'react';
import { string, bool, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

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
    marginTop: 0,
    marginBottom: '0.25rem',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover > button': {
      opacity: 0.7
    }
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '1rem',
  },
  streamDetails: {
    paddingLeft: '0.5rem',
  },
  streamSubDetails: {
    color: '#606060',
    fontSize: '14px',
  },
  playButton: {
    color: 'white',
    opacity: 0,
    position: 'absolute',
    left: 0, 
    right: 0,
    top: '10%',
    marginLeft: 'auto',
    marginRight: 'auto', 
    width: '100px', /* Need a specific value to work */
    transition: 'opacity 0.5s ease',
  },
  playButtonIcon: {
    fontSize: 100,
    color: 'white',
  },
}));

const GameStreamDetails = ({
  streamTitle,
  streamThumbnailUrl,
  streamUrl,
  streamerName,
  streamerAvatarUrl,
  platformName,
  viewCount }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <a href={streamUrl} target='_blank' className={classes.link}>
        <IconButton size="medium" className={classes.playButton}>
          <PlayCircleOutlineIcon className={classes.playButtonIcon} />
        </IconButton >
        <img src={streamThumbnailUrl} width={320} height={180} />
        <div className={classes.detailsContainer}>
          <Avatar src={streamerAvatarUrl} />
          <div className={classes.streamDetails}>
            <Tooltip title={streamTitle}>
              <h3 className={classes.streamTitle}>{streamTitle}</h3>
            </Tooltip>
            <div className={classes.streamSubDetails}>
              <div>{streamerName}</div>
              <span>{platformName}</span>
              <span> • </span>
              <span>{`${viewCount} viewers`}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

GameStreamDetails.propTypes = {
  streamTitle: string.isRequired,
  streamerName: string.isRequired,
  streamThumbnailUrl: string.isRequired,
  streamUrl: string.isRequired,
  streamerAvatarUrl: string.isRequired,
  platformName: string.isRequired,
  viewCount: number.isRequired,
}

export default GameStreamDetails;