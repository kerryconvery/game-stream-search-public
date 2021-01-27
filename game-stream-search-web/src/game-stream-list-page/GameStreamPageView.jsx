import React from 'react';
import { node, bool, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import StandardPageTemplate from '../shared-components/StandardPageTemplate';

const useStyles = makeStyles(() => ({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '280px auto',
    gridTemplateRows: 'auto',
    gap: '0 15px'
  },
  sideBar: {
    position: 'fixed',
    width: '280px',
    height: '100vh',
    backgroundColor: 'white',
    '& > *': {
      paddingTop: '1rem',
    },
  },
  mainContent: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    paddingTop: '20px',
  },
}));

const GameStreamPageView = ({
  children,
  searchBar,
  leftSideBar,
  notFoundNotice,
  numberOfStreams,
  isLoadingStreams
}) => {
  const classes = useStyles();
  const hasStreams = numberOfStreams > 0 || isLoadingStreams;

  return (
    <StandardPageTemplate toolBar={searchBar} >
      <div className={classes.gridContainer}>
        <div className={classes.sideBar}>
          {leftSideBar}
        </div>
        <div className={classes.mainContent}>
          {!hasStreams && notFoundNotice}
          {hasStreams && children}
        </div>
      </div>
    </StandardPageTemplate>
  )
}

GameStreamPageView.propTypes = {
  children: node.isRequired,
  searchBar: node.isRequired,
  leftSideBar: node.isRequired,
  notFoundNotice: node.isRequired,
  numberOfStreams: number.isRequired,
  isLoadingStreams: bool.isRequired,
}

export default GameStreamPageView;