import React, { useState } from 'react';
import _set from 'lodash/set';
import { useAlertNotification } from '../providers/AlertNotificationProvider';
import { useGameStreamApi } from '../api/gameStreamApi';
import useInfiniteStreamLoader from './hooks/useInfiniteStreamLoader';
import GameStreamPageTemplate from './templates/GameStreamPageTemplate';
import GameStreamSearchBar from './components/GameStreamSearchBar';
import InfiniteGameStreamGrid from './components/InfiniteGameStreamGrid';
import NoStreamsFound from './components/NoStreamsFound';

const GameStreamListPage = () => {
  const { showErrorAlert } = useAlertNotification();
  const { getStreams } = useGameStreamApi();
  const streams = useInfiniteStreamLoader(getStreams, showErrorAlert);

  return (      
    <GameStreamPageTemplate
      searchBar={<GameStreamSearchBar onGameChange={gameName => streams.filterStreams({ gameName })} />}
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