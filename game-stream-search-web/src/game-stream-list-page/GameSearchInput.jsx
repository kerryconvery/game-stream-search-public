import React, { useState } from 'react';
import { func } from 'prop-types';
import _has from 'lodash/has';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const GameStreamInput = ({ onGameChange }) => {
  const [ input, setInput ] = useState('');
  
  const classes = useStyles();

  const onInputChange = (e) => {
    if (_has(e, 'target.value')) {
      setInput(e.target.value);
    }
  }
  const onKeyPress = (e) => {
    if(e.keyCode === 13 && _has(e, 'target.value')) {
      onGameChange(e.target.value)
    }
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search games"
        inputProps={{ 'aria-label': 'search games' }}
        onChange={onInputChange}
        onKeyDown={onKeyPress}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => onGameChange(input)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

GameStreamInput.propTypes = {
  onGameChange: func.isRequired,
}

export default GameStreamInput;
