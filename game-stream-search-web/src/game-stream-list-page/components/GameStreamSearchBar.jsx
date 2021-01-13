import React from 'react';
import pickProps from '../../prop-utils/pickProps';
import GameSearchInput from './GameSearchInput';

const GameStreamSearchBar = (props) => (
  <GameSearchInput {...pickProps(props, GameSearchInput.propTypes)} />
);

GameStreamSearchBar.propTypes = {
  ...GameSearchInput.PropTypes
}

export default GameStreamSearchBar;
