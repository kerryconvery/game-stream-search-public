import React from 'react';
import { useStreamService } from '../../../../providers/StreamServiceProvider';
import { useTelemetryTracker } from '../../../../providers/TelemetryTrackerProvider';
import useChannelsLoader from '../../../hooks/useChannelsLoader';
import FeaturedChannelsSideBarView from './FeaturedChannelsSideBarView';
import AddChannelForm from './add-channel-form/AddChannelForm';
import ChannelListView from '../ChannelListView';

const FeaturedChannelSideBar = () => {
  const { getChannels } = useStreamService();
  const { channels, isLoading, updateChannels } = useChannelsLoader(getChannels, () => {});
  const { trackFeaturedChannelOpened } = useTelemetryTracker();

  const onChannelsUpdated = async () => {
    const channels = await getChannels();
    updateChannels(channels);
  }

  return (
    <FeaturedChannelsSideBarView
      addChannelForm={props => (
        <AddChannelForm
          onClose={props.onCloseForm}
          onSaveSuccess={onChannelsUpdated}
        />
      )}
    >
      <ChannelListView
        channels={channels}
        isLoading={isLoading}
        onChannelOpened={trackFeaturedChannelOpened}
      />
    </FeaturedChannelsSideBarView>
  )
}

export default FeaturedChannelSideBar;