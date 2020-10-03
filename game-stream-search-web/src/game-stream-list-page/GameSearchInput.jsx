import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import Autosuggestion from './Autosuggestion';

const GameStreamInput = ({ onGameChange }) => {
  const [ suggestions, setSuggestions ] = useState([]);

  return (
    <Autosuggestion
      id='gameSearchField'
      label="Search by game"
      suggestions={suggestions}
      onInputChange={onGameChange}
    />
  )
};

GameStreamInput.propTypes = {
  onGameChange: func.isRequired,
}

export default GameStreamInput;
