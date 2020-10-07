import React, { useEffect, useState } from 'react';
import { useGameStreamApi } from '../api/gameStreamApi';
import StandardPageTemplate from '../templates/StandardPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import InfiniteGameStreamList from './InfiniteGameStreamList';
import addStreams from './gameStreamListSelectors';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState('fortnite');
  const [ nextPageToken, setNextPageToken ] = useState();
  const [ streams, setStreams ] = useState({});
  const { getStreams } = useGameStreamApi();

  const onSearch = (gameName) => {
    setStreams({});
    setGameName(gameName);
  }
  
  useEffect(() => {
    getStreams(gameName, nextPageToken).then(data => setStreams(addStreams(streams, data)))
  }, [gameName, nextPageToken]);
  
  return (
    <>
      <GameStreamSearchBar onGameChange={onSearch} />
      <InfiniteGameStreamList
        gameStreams={streams.items}
        nextPageToken={streams.nextPageToken}
        onLoadMore={setNextPageToken}
      />
    </>
  )
}

export default GameStreamListPage;