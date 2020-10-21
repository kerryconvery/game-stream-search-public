import React from 'react';
import { string, func, bool, arrayOf, shape, number } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import GameStreamGrid, { getLoadingTitles, getStreamTiles } from './GameStreamGrid';

const InfiniteGameStreamGrid = ({ streams, isLoadingStreams, hasMoreStreams, loadMoreStreams, }) => (
  <InfiniteScroll
    pageStart={0}
    loadMore={loadMoreStreams}
    hasMore={hasMoreStreams}
  >
    <GameStreamGrid>
      {getStreamTiles(streams)}
      {isLoadingStreams && getLoadingTitles(6)}
    </GameStreamGrid>
  </InfiniteScroll>
)

InfiniteGameStreamGrid.propTypes = {
  streams: arrayOf(shape({
    streamerName: string.isRequired,
    streamTitle: string.isRequired,
    streamThumbnailUrl: string.isRequired,
    streamerAvatarUrl: string.isRequired,
    platformName: string.isRequired,
    isLive: bool.isRequired,
    streamUrl: string.isRequired,
    views: number.isRequired,
  })),
  hasMoreStreams: bool.isRequired,
  isLoadingStreams: bool.isRequired,
  loadMoreStreams: func.isRequired,
}

InfiniteGameStreamGrid.defaultProps = {
  streams: [],
}

export default InfiniteGameStreamGrid;