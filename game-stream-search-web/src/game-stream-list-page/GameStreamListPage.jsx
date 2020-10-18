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
  const [ fetching, setFetching ] = useState(false);
  const { getStreams } = useGameStreamApi();

  const onSearch = (gameName) => {
    setNextPageToken(null);
    dispatchStreams({ type: CLEAR });
    setGameName(gameName);
  }
  
  useEffect(() => {
    setFetching(true);
    getStreams(gameName, nextPageToken)
      .then(data => { setFetching(false), dispatchStreams({ type: UPDATE, data }) })
      .catch(() => setFetching(false));
  }, [gameName, nextPageToken]);
  
  return (
    <StandardPageTemplate
      toolBar={<GameStreamSearchBar onGameChange={onSearch} />}
    >
      <InfiniteGameStreamList
        streams={streams.items}
        nextPageToken={streams.nextPageToken}
        onLoadMore={setNextPageToken}
        fetching={fetching}
      />
    </StandardPageTemplate>
  )
}

export default GameStreamListPage;