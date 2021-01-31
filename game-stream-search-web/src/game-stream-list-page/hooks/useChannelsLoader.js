import { useEffect } from 'react';
import useReducers from '../../shared-components/hooks/useReducers';

const reducers = state => ({
  channelLoaded: channels => ({ ...state, channels, isLoading: false }),
  updateChannels: channels => ({ ...state, channels }),
})

const initialState = {
  channels: [],
  isLoading: true,
}

const useChannelsLoader = (onLoadChannels, onLoadError) => {
  const { state, channelLoaded, updateChannels } = useReducers(reducers, initialState);

  useEffect(() => {
    onLoadChannels()
      .then(channelLoaded)
      .catch(onLoadError)
  }, [])

  return {
    channels: state.channels,
    isLoading: state.isLoading,
    updateChannels,
  };
}

export default useChannelsLoader;