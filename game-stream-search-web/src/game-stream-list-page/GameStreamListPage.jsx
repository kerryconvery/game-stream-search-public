import React, { useEffect, useState, useReducer } from 'react';
import { useGameStreamApi } from '../api/gameStreamApi';
import StandardPageTemplate from '../templates/StandardPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import InfiniteGameStreamList from './InfiniteGameStreamList';
import streamsReducer, { UPDATE, CLEAR } from './gameStreamListReducers';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState();
  const [ nextPageToken, setNextPageToken ] = useState();
  const [ streams, dispatchStreams ] = useReducer(streamsReducer, {});
  const { getStreams } = useGameStreamApi();

  const onSearch = (gameName) => {
    setNextPageToken(null);
    dispatchStreams({ type: CLEAR });
    setGameName(gameName);
  }
  
  useEffect(() => {
    getStreams(gameName, nextPageToken).then(data => dispatchStreams({ type: UPDATE, data }));
  }, [gameName, nextPageToken]);
  
  return (
    <StandardPageTemplate
      toolBar={<GameStreamSearchBar onGameChange={onSearch} />}
    >
      <InfiniteGameStreamList
        gameStreams={streams.items}
        nextPageToken={streams.nextPageToken}
        onLoadMore={setNextPageToken}
      />
    </StandardPageTemplate>
  )
}

export default GameStreamListPage;