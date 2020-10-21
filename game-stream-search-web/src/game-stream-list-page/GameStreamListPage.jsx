import React, { useState } from 'react';
import _set from 'lodash/set';
import { useAlertNotification } from '../providers/AlertNotificationProvider';
import { useGameStreamApi } from '../api/gameStreamApi';
import useInfiniteStreamLoader from './useInfiniteStreamLoader';
import GameStreamPageTemplate from './GameStreamPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import InfiniteGameStreamGrid from './InfiniteGameStreamGrid';
import NoStreamsFound from './NoStreamsFound';

const GameStreamListPage = () => {
  const [ filters, setFilters ] = useState({});
  const { showErrorAlert } = useAlertNotification();
  const { getStreams } = useGameStreamApi();

  const streams = useInfiniteStreamLoader(filters, getStreams, showErrorAlert);
  
  const setFilter = filterName => value => {
    streams.clearStreams();
    setFilters({ ...filters, [filterName]: value });
  };

  return (      
    <GameStreamPageTemplate
      searchBar={<GameStreamSearchBar onGameChange={setFilter('gameName')} />}
      notFoundNotice={<NoStreamsFound />}
      numberOfStreams={streams.items.length}
      isLoadingStreams={streams.isLoading}
    >
      <InfiniteGameStreamGrid
        streams={streams.items}
        loadMoreStreams={streams.loadMoreStreams}
        isLoadingStreams={streams.isLoading}
        hasMoreStreams={streams.hasMoreStreams}
      />
    </GameStreamPageTemplate>
  )
}

export default GameStreamListPage;