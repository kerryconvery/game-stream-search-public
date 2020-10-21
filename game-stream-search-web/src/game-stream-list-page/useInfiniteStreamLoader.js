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
    case 'RELOAD_STREAMS': {
      return {
        ...state,
        items: [],
        nextPageToken: null,
        currentPageToken: null,
        isLoading: true,
      }
    }
    case 'LOAD_MORE_STREAMS': {
      return {
        ...state,
        currentPageToken: state.nextPageToken,
        isLoading: true,
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

const useInfiniteStreamLoader = (onLoadStreams, onLoadError) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const hasMoreStreams = state.nextPageToken !== null && !state.isLoading;

  const reloadStreams = () => dispatch({ type: 'RELOAD_STREAMS' });
  const loadMoreStreams = () => dispatch({ type: 'LOAD_MORE_STREAMS' });
  
  useEffect(() => {
    if (state.isLoading) {
      onLoadStreams(state.currentPageToken)
        .then(data => dispatch({ type: 'STREAMS_LOADED', data }))
        .catch(onLoadError);
    }
  }, [state.isLoading, state.currentPageToken]);
  
  return {
    items: state.items,
    isLoading: state.isLoading,
    hasMoreStreams,
    reloadStreams,
    loadMoreStreams,
  };
}

export default useInfiniteStreamLoader;