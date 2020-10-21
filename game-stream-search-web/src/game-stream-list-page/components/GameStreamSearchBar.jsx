import React from 'react';
import GameSearchInput from './GameSearchInput';

const GameStreamSearchBar = (props) => (
  <GameSearchInput {...props} />
);

GameStreamSearchBar.propTypes = {
  ...GameSearchInput.PropTypes
}

export default GameStreamSearchBar;
