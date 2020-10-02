import React, { useEffect, useState } from 'react';
import { useGameStreamStreamApi, streamSearchRequest } from '../api/gameStreamSearchApi';
import StandardPageTemplate from '../templates/standardPageTemplate';
import GameStreamList from './gameStreamList';
import streamSelector from './gameStreamListSelectors';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState('dark souls');
  const [ streams, setStreams ] = useState();

  const searchForStream = useGameStreamStreamApi(streamSearchRequest);

  useEffect(() => {
    searchForStream(gameName).then(data => {
      const streams = streamSelector(data);
      setStreams(streams);
    })
  }, [gameName]);
  
  console.log('streams:', streams);
  return (
    <StandardPageTemplate
      title='Stream Machine'
    >
      <GameStreamList gameStreams={streams} />
    </StandardPageTemplate>
  )
}

export default GameStreamListPage;