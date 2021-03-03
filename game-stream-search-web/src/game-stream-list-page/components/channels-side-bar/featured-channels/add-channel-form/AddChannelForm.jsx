import React from 'react';
import { func } from 'prop-types';
import _get from 'lodash/get';
import useFormController from '../../../../../shared-components/form/useFormController';
import AddChannelFormView, { validateForm, mapApiErrorsToFields } from './AddChannelFormView';
import { useStreamService } from '../../../../../providers/StreamServiceProvider';
import useEventBus from '../../../../../event-bus/eventBus';
import { notifyFeaturedChannelsUpdated } from '../../../../../notifications/events';
import { useTelemetryTracker } from '../../../../../providers/TelemetryTrackerProvider';

const AddChannelForm = ({ onClose, onSaveSuccess }) => {
  const { addChannel, mapHttpResponse } = useStreamService();
  const { dispatchEvent } = useEventBus();
  const { trackFeatureChannelNotFound } = useTelemetryTracker();

  const handleSaveSuccess = (result, formValues) => {
    notifyFeaturedChannelsUpdated(formValues.channelName, result.isCreated, dispatchEvent);
    onSaveSuccess();
    onClose();
  }

  const handleSaveFailed = (formValues, errors) => {
    if (_get(errors, 'channelName.code') === 'ChannelNotFoundOnPlatform') {
      trackFeatureChannelNotFound({
        platformName: formValues.streamPlatform,
        channelName: formValues.channelName
      });
    };
  }

  const saveChannel = async (formValues) => {
    const response = await addChannel(formValues);
    return mapHttpResponse(response, mapApiErrorsToFields);
  }

  const formController = useFormController(validateForm, saveChannel, handleSaveSuccess, handleSaveFailed);

  return (
    <AddChannelFormView
      formValues={formController.formValues}
      errors={formController.errors}
      isSaving={formController.isSaving}
      onChange={formController.onChange}
      onSave={formController.onSave}
      onCancel={onClose}
    />
  )
}

AddChannelForm.propTypes = {
  onClose: func.isRequired,
  onSaveSuccess: func.isRequired,
}

export default AddChannelForm;