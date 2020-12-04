import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeaturedChannels from './FeaturedChannels';

const useStyles = makeStyles({
  sidebarContent: {   
    position: 'fixed',
    width: '280px',
    height: 'calc(100vh - 75px)',
    overflow: 'hidden',
    backgroundColor: 'inherited',
    '&:hover': {
      overflowY: 'auto',
    },
  }
});

const ChannelsSideBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarContent}>
      <FeaturedChannels />
    </div>
  )
}

export default ChannelsSideBar;

