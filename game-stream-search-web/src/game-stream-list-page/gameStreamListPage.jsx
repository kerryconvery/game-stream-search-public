import React, { useEffect, useState } from 'react';
import { useGameStreamApi } from '../api/gameStreamApi';
import StandardPageTemplate from '../templates/StandardPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import GameStreamList from './GameStreamList';
import streamSelector from './gameStreamListSelectors';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState('fortnite');
  const [ streams, setStreams ] = useState();
  const { getStreams } = useGameStreamApi();

  useEffect(() => {
    getStreams(gameName).then(data => setStreams(streamSelector(data)))
  }, [gameName]);
  
  return (
    <>
    <GameStreamSearchBar onGameChange={setGameName} />
    <GameStreamList gameStreams={streams} />
    </>
  )
}

export default GameStreamListPage;