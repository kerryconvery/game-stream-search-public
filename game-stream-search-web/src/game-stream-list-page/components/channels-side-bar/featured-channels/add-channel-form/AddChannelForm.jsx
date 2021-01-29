import React from 'react';
import { func } from 'prop-types';
import useFormController from '../../../../../shared-components/form/useFormController';
import AddChannelFormView, { validateForm, mapApiErrorsToFields } from './AddChannelFormView';
import { useStreamService } from '../../../../../providers/StreamServiceProvider';
import useEventBus from '../../../../../event-bus/eventBus';
import { postNotificationEvent, buildToastEvent } from '../../../../../notifications/events';

const AddChannelForm = ({ onClose, onSaveSuccess }) => {
  const { addChannel, mapHttpResponse } = useStreamService();
  const { dispatchEvent } = useEventBus();

  const sendSuccessNotifcation = (result, formValues) => {
    postNotificationEvent(
      dispatchEvent,
      buildToastEvent(`Channel ${formValues.channelName} ${result.isCreated ? 'added' : 'updated'} successfully`),
    );
  }

  const handleSaveSuccess = (result, formValues) => {
    sendSuccessNotifcation(result, formValues);
    onSaveSuccess();
    onClose();
  }
  const saveChannel = async (formValues) => {
    const response = await addChannel(formValues);
    return mapHttpResponse(response, mapApiErrorsToFields);
  }

  const formController = useFormController(validateForm, saveChannel, handleSaveSuccess);

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