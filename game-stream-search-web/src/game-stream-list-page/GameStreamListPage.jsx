import React from 'react';
import { useGameStreamApi } from '../api/gameStreamApi';
import useEventBus from '../event-bus/eventBus';
import { dispatchAlert, getErrorAlert } from '../notifications/alerts';
import useInfiniteStreamLoader from './hooks/useInfiniteStreamLoader';
import GameStreamPageTemplate from './GameStreamPageTemplate';
import GameStreamSearchBar from './components/GameStreamSearchBar';
import InfiniteGameStreamGrid from './components/InfiniteGameStreamGrid';
import NoStreamsFound from './components/NoStreamsFound';

const GameStreamListPage = () => {
  const { getStreams } = useGameStreamApi();
  const { dispatchEvent } = useEventBus();

  const showErrorAlert = () => dispatchAlert(dispatchEvent, getErrorAlert());

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