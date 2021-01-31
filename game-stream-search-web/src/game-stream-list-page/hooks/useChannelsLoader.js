import { useEffect } from 'react';
import useReducers from '../../shared-components/hooks/useReducers';

const createReducers = state => ({
  channelLoaded: channels => ({ ...state, channels, isLoading: false }),
  setChannels: channels => ({ ...state, channels }),
})

const initialState = {
  channels: [],
  isLoading: true,
}

const useChannelsLoader = (onLoadChannels, onLoadError) => {
  const [ state, channelLoaded, setChannels ] = useReducers(createReducers, initialState);

  useEffect(() => {
    onLoadChannels()
      .then(channelLoaded)
      .catch(onLoadError)
  }, [])

  return {
    channels: state.channels,
    isLoading: state.isLoading,
    updateChannels: setChannels,
  };
}

export default useChannelsLoader;