import React from 'react';
import ChannelList from '../ChannelList';
import FeaturedChannelsTemplate from './FeaturedChannelsTemplate';
import AddChannelFormController from '../add-channel-form/AddChannelFormController';
import AddChannelForm, { validateForm, mapApiErrorsToFields } from '../add-channel-form/AddChannelForm';
import { useGameStreamApi } from '../../../../api/gameStreamApi';
import useChannelsLoader from '../../../hooks/useChannelsLoader';
import useEventBus from '../../../../event-bus/eventBus';
import { postNotificationEvent, buildToastEvent } from '../../../../notifications/events';

const FeaturedChannels = () => {
  const { addChannel, getChannels, StatusType } = useGameStreamApi();
  const { channels, isLoading, updateChannels } = useChannelsLoader(getChannels, () => {});
  const { dispatchEvent } = useEventBus();

  const handleChannelsUpdated = async (result, formValues) => {
    const channels = await getChannels();

    updateChannels(channels);

    postNotificationEvent(
      dispatchEvent,
      buildToastEvent(`Channel ${formValues.channelName} ${result.created ? 'added' : 'updated'} successfully`),
    );
  }

  const handleSaveChannel = async (formValues) => {
    const result = await addChannel(formValues);

    return {
      success: result.status !== StatusType.BadRequest,
      created: result.status === StatusType.Created,
      errors: result.status === StatusType.BadRequest ? mapApiErrorsToFields(result.errors) : undefined,
    }
  }

  return (
    <FeaturedChannelsTemplate
      addFeaturedChannelForm = {(closeForm) => (
        <AddChannelFormController
          onValidateForm={validateForm}
          onSaveForm={handleSaveChannel}
          onSaveSuccess={handleChannelsUpdated}
          onCloseForm={closeForm}
        > 
          {props => <AddChannelForm {...props} />}
        </AddChannelFormController>
      )}
    >
      <ChannelList
        channels={channels}
        isLoading={isLoading}
      />
    </FeaturedChannelsTemplate>
  )
}

export default FeaturedChannels;