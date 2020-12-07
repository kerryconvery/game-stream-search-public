import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import ChannelList from './ChannelList';
import SideBarPanel from './SideBarPanel';
import AddChannelFormController from './add-channel-form/AddChannelFormController';
import AddChannelForm, { validateForm, mapApiErrorsToFields } from './add-channel-form/AddChannelForm';
import { useGameStreamApi } from '../../../api/gameStreamApi';
import useChannelsLoader from '../../hooks/useChannelsLoader';
import useEventBus from '../../../event-bus/eventBus';
import { postNotificationEvent, buildToastEvent } from '../../../notifications/events';

const getSuccessEvent = (channelName, created) => 
  buildToastEvent(`Channel ${channelName} ${created ? 'added' : 'updated'} successfully`);

const FeaturedChannels = () => {
  const { addChannel, getChannels, StatusType } = useGameStreamApi();
  const { channels, isLoading, updateChannels } = useChannelsLoader(getChannels, () => {});
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const { dispatchEvent } = useEventBus();

  const addButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChannelsUpdated = async (result, formValues) => {
    setAnchorEl(null);

    const channels = await getChannels();

    updateChannels(channels);

    postNotificationEvent(dispatchEvent, getSuccessEvent(formValues.channelName, result.created));
  }

  const handleSaveChannel = async (formValues) => {
    const result = await addChannel(formValues);

    return {
      success: result.status !== StatusType.BadRequest,
      created: result.status === StatusType.Created,
      errors: result.status === StatusType.BadRequest ? mapApiErrorsToFields(result.errors) : undefined,
    }
  }

  const open = Boolean(anchorEl);

  return (
    <SideBarPanel
      title='Featured channels'
      action={(
        <Tooltip title='Add a new channel to the list'>
          <IconButton color='primary' size='small' onClick={addButtonClick}>
            <Add />
          </IconButton>
        </Tooltip>
      )}
    >
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <AddChannelFormController
          onValidateForm={validateForm}
          onSaveForm={handleSaveChannel}
          onSaveSuccess={handleChannelsUpdated}
        >
          {props => <AddChannelForm {...props} onCancel={handleClose} />}
        </AddChannelFormController>
      </Popover>
      <ChannelList
        channels={channels}
        isLoading={isLoading}
        numberOfLoadingTiles={3}
      />
    </SideBarPanel>
  )
}

export default FeaturedChannels;