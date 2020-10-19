import React, { useEffect, useState, useReducer } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useGameStreamApi } from '../api/gameStreamApi';
import { useAlertNotification } from '../providers/AlertNotificationProvider';
import StandardPageTemplate from '../templates/StandardPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import InfiniteGameStreamList from './InfiniteGameStreamList';
import NoStreamsFound from './NoStreamsFound';
import streamsReducer, { UPDATE, CLEAR } from './gameStreamListReducers';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState();
  const [ nextPageToken, setNextPageToken ] = useState();
  const [ streams, dispatchStreams ] = useReducer(streamsReducer, {});
  const { getStreams } = useGameStreamApi();
  const { showErrorAlert } = useAlertNotification();

  const onSearch = (gameName) => {
    setNextPageToken(null);
    dispatchStreams({ type: CLEAR });
    setGameName(gameName);
  }

  const getIsFetching = () => _isEmpty(streams) || streams.nextPageToken === nextPageToken;
  
  useEffect(() => {
    getStreams(gameName, nextPageToken)
      .then(data => dispatchStreams({ type: UPDATE, data }))
      .catch(showErrorAlert);
  }, [gameName, nextPageToken]);
  
  return (
    <StandardPageTemplate
      toolBar={<GameStreamSearchBar onGameChange={onSearch} />}
    >
      {!_isEmpty(streams) && streams.items.length === 0 && <NoStreamsFound searchTerm={gameName} /> }
      {(_isEmpty(streams) || streams.items.length > 0) &&
        <InfiniteGameStreamList
          streams={streams.items}
          nextPageToken={streams.nextPageToken}
          onLoadMore={setNextPageToken}
          fetching={getIsFetching()}
        />
      }
  </StandardPageTemplate>
  )
}

export default GameStreamListPage;