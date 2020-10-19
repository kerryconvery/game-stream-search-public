import React, { useEffect, useState, useReducer } from 'react';
import _isEmpty from 'lodash/isEmpty';
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

  const getIsFetching = () => _isEmpty(streams) || streams.nextPageToken === nextPageToken;
  
  useEffect(() => {
    getStreams(gameName, nextPageToken)
      .then(data => dispatchStreams({ type: UPDATE, data }));
  }, [gameName, nextPageToken]);
  
  return (
    <StandardPageTemplate
      toolBar={<GameStreamSearchBar onGameChange={onSearch} />}
    >
      <InfiniteGameStreamList
        streams={streams.items}
        nextPageToken={streams.nextPageToken}
        onLoadMore={setNextPageToken}
        fetching={getIsFetching()}
      />
    </StandardPageTemplate>
  )
}

export default GameStreamListPage;