import React, { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'STREAMS_LOADED': {
      return {
        ...state,
        items: state.items.concat(action.data.items),
        nextPageToken: action.data.nextPageToken,
        isLoading: false,
      }
    }
    case 'CLEAR_STREAMS': {
      return {
        ...state,
        items: [],
        nextPageToken: null,
        currentPageToken: null,
      }
    }
    case 'LOAD_MORE_STREAMS': {
      return {
        ...state,
        currentPageToken: state.nextPageToken,
      }
    }
    case 'LOADING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    default: throw new Error(`useInfiniteStreamLoader - unknown action ${action.type}`);
  }
}

const initialState = {
  items: [],
  currentPageToken: null,
  nextPageToken: null,
  isLoading: true
};

const useInfiniteStreamLoader = (filters, onLoadStreams, onLoadError) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const clearStreams = () => dispatch({ type: 'CLEAR_STREAMS' });
  const loadMoreStreams = () => dispatch({ type: 'LOAD_MORE_STREAMS' });

  const hasMoreStreams = state.nextPageToken !== null && !state.isLoading;
  
  useEffect(() => {
    if (!state.isLoading) {
      dispatch({ type: 'LOADING' });
    }

    onLoadStreams(filters.gameName, state.currentPageToken)
      .then(data => dispatch({ type: 'STREAMS_LOADED', data }))
      .catch(onLoadError);
  }, [filters.gameName, state.currentPageToken]);
  
  return {
    items: state.items,
    isLoading: state.isLoading,
    hasMoreStreams,
    clearStreams,
    loadMoreStreams,
  };
}

export default useInfiniteStreamLoader;