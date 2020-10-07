import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useGameStreamApi } from '../api/gameStreamApi';
import StandardPageTemplate from '../templates/StandardPageTemplate';
import GameStreamSearchBar from './GameStreamSearchBar';
import GameStreamList from './GameStreamList';
import addStreams from './gameStreamListSelectors';

const GameStreamListPage = () => {
  const [ gameName, setGameName ] = useState('fortnite');
  const [ nextPageToken, setNextPageToken ] = useState();
  const [ streams, setStreams ] = useState();
  const { getStreams } = useGameStreamApi();

  const onSearch = (gameName) => {
    setStreams(null);
    setGameName(gameName);
  }

  useEffect(() => {
    getStreams(gameName, nextPageToken).then(data => setStreams(addStreams(streams, data)))
  }, [gameName, nextPageToken]);
  
  return (
    <>
      <GameStreamSearchBar onGameChange={onSearch} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => { setNextPageToken(streams.nextPageToken) }}
        hasMore={streams && streams.nextPageToken !== null}
      >
        <GameStreamList gameStreams={streams ? streams.items : []} />
      </InfiniteScroll>
    </>
  )
}

export default GameStreamListPage;