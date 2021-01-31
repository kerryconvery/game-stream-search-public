import { useEffect } from 'react';
import useReducers from '../../shared-components/hooks/useReducers';

const createReducers = state => ({
  streamsLoaded: (items, nextPageToken) => (
    { ...state, items: state.items.concat(items), nextPageToken, isLoading: false }
  ),
  filterStreams: (filters) => (
    {
      ...state,
      items: [],
      filters: { ...state.filters, ...filters },
      nextPageToken: null, 
      currentPageToken: null,
      isLoading: true,
    }
  ),
  loadMoreStreams: () => (
    { ...state, currentPageToken: state.nextPageToken, isLoading: true }
  ),
})

const initialState = {
  items: [],
  filters: {},
  nextPageToken: null,
  currentPageToken: null,
  isLoading: true
};

const useInfiniteStreamLoader = (onLoadStreams, onLoadError, initialFilters = {}) => {
  const [
    state,
    streamsLoaded,
    filterStreams,
    loadMoreStreams,
  ] = useReducers(createReducers, { ...initialState, filters: initialFilters });

  const hasMoreStreams = state.nextPageToken !== null && !state.isLoading;
  
  useEffect(() => {
    onLoadStreams(state.filters, state.currentPageToken)
      .then(data => streamsLoaded(data.items, data.nextPageToken))
      .catch(onLoadError);
  }, [state.filters, state.currentPageToken]);
  
  return {
    items: state.items,
    isLoading: state.isLoading,
    filters: state.filters,
    hasMoreStreams,
    loadMoreStreams: loadMoreStreams,
    filterStreams: filterStreams,
  };
}

export default useInfiniteStreamLoader;