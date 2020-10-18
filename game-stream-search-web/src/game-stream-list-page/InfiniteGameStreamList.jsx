import React from 'react';
import { string, func, bool } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import GameStreamList from './GameStreamList';

const InfiniteGameStreamList = ({ nextPageToken, onLoadMore, ...props }) => (
  <InfiniteScroll
    pageStart={0}
    loadMore={() => onLoadMore(nextPageToken) }
    hasMore={nextPageToken !== null }
  >
    <GameStreamList {...props}/>
  </InfiniteScroll>
)

InfiniteGameStreamList.propTypes = {
  ...GameStreamList.propTypes,
  nextPageToken: string,
  onLoadMore: func.isRequired,
}

InfiniteGameStreamList.defaultProps = {
  ...GameStreamList.defaultProps,
  nextPageToken: null,
}

export default InfiniteGameStreamList;