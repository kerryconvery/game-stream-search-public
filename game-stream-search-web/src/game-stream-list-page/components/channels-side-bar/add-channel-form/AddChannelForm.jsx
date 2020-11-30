import React, { useReducer } from 'react';
import { func } from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Button from '@material-ui/core/Button';
import useEventBus from '../../../../event-bus/eventBus';
import {
  postNotificationEvent,
  buildToastEvent
} from '../../../../notifications/events';
import FormTemplate, { SubmitButton } from '../../../../templates/FormTemplate';
import AddChannelFormFields, { validateForm, mapApiErrorsToFields } from './AddChannelFormFields';
import { useGameStreamApi } from '../../../../api/gameStreamApi';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGED': {
      return {
        ...state,
        formValues: action.formValues,
      }
    }
    case 'ERRORS': {
      return {
        ...state,
        errors: action.errors
      }
    }
    case 'SAVING': {
      return {
        ...state,
        submitted: true,
        isSaving: true,
      }
    }
    case 'SAVE_FAILED': {
      return {
        ...state,
        errors: action.errors,
        isSaving: false,
      }
    }
    case 'SAVE_SUCCESS': {
      return {
        ...state,
        errors: action.errors,
        isSaving: false,
      }
    }
  }
}

const initialState = {
  formValues: { streamPlatform: 'Twitch' },
  errors: {},
  isSaving: false,
  submitted: false,
}

const AddChannelForm = ({ onCancel, onChannelsUpdated }) => {
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

  const onChange = values => {
    dispatch({ type: 'FIELD_CHANGED', formValues: values });

    if (state.submitted) {
      dispatch({ type: 'ERRORS', errors: validateForm(values) });
    }
  }

  return (
    <FormTemplate
      title='Add Channel'
      content={
        <AddChannelFormFields
          formValues={state.formValues}
          errors={state.errors}
          onChange={onChange} 
        />
      }
    >
      <SubmitButton submitting={state.isSaving} onClick={onSave}>Save</SubmitButton>
      <Button onClick={onCancel}>Cancel</Button>
    </FormTemplate>
  )
}

AddChannelForm.propTypes = {
  onCancel: func.isRequired,
  onChannelsUpdated: func.isRequired,
}

export default AddChannelForm;