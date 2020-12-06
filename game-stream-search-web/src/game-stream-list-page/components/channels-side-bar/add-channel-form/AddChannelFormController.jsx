import { useReducer } from 'react';
import { func } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import useEventBus from '../../../../event-bus/eventBus';
import {
  postNotificationEvent,
  buildToastEvent
} from '../../../../notifications/events';
import { useGameStreamApi } from '../../../../api/gameStreamApi';
import { validateForm, mapApiErrorsToFields } from './AddChannelForm';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGED': return { ...state, formValues: action.formValues, errors: action.errors }
    case 'SAVING': return { ...state, submitted: true, isSaving: true }
    case 'SAVE_FAILED': return { ...state, errors: action.errors, isSaving: false }
    case 'SAVE_SUCCESS': return { ...state, errors: action.errors, isSaving: false }
  }
}

const initialState = {
  formValues: { streamPlatform: 'Twitch' },
  errors: {},
  isSaving: false,
  submitted: false,
}

const AddChannelFormController = ({ onChannelsUpdated, children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { StatusType, addChannel, getChannels } = useGameStreamApi();
  const { dispatchEvent } = useEventBus();

  const notifyChannelAdded = (channelName) => {
    postNotificationEvent(dispatchEvent, buildToastEvent(`Channel ${channelName} added successfully`));
  }

  const notifyChannelUpdated = (channelName) => {
    postNotificationEvent(dispatchEvent, buildToastEvent(`Channel ${channelName} updated successfully`));
  }

  const notifyChannelSaved = async (created, channelName) => {
    const channels = await getChannels();
    
    if (created) {
      notifyChannelAdded(channelName);
    } else {
      notifyChannelUpdated(channelName);
    }

    onChannelsUpdated(channels);
  }

  const onSave = async () => {
    dispatch({ type: 'SAVING' });

    const errors = validateForm(state.formValues);

    if (!_isEmpty(errors)) {
      return dispatch({ type: 'SAVE_FAILED', errors });
    }

    const result = await addChannel(state.formValues);

    if (result.status === StatusType.BadRequest) {
      return dispatch({ type: 'SAVE_FAILED', errors: mapApiErrorsToFields(result.errors) });
    }

    notifyChannelSaved(result.status === StatusType.Created, result.channel.channelName);

    dispatch({ type: 'SAVE_SUCCESS' });
  };

  const onChange = (formValues) => {
    if (state.submitted) {
      dispatch({ type: 'FIELD_CHANGED', formValues, errors: validateForm(formValues) });
    } else {
      dispatch({ type: 'FIELD_CHANGED', formValues, errors: state.errors });
    }
  }

  return children({
    formValues: state.formValues,
    errors: state.errors,
    isSaving: state.isSaving,
    onChange,
    onSave,
  })
}

AddChannelFormController.propTypes = {
  onChannelsUpdated: func.isRequired,
  children: func.isRequired,
}

export default AddChannelFormController;