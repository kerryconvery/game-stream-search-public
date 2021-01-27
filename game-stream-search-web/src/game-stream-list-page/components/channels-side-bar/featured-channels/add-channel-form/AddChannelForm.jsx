import React from 'react';
import { func } from 'prop-types';
import FormController from '../../../../../shared-components/form/FormController';
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

  return (
    <FormController
      onValidateForm={validateForm}
      onSaveForm={saveChannel}
      onSaveSuccess={handleSaveSuccess}
    >
      {props => <AddChannelFormView
        formValues={props.formValues}
        errors={props.errors}
        isSaving={props.isSaving}
        onChange={props.onChange}
        onSave={props.onSave}
        onCancel={onClose}
      />}
    </FormController>
  )
}

AddChannelForm.propTypes = {
  onClose: func.isRequired,
  onSaveSuccess: func.isRequired,
}

export default AddChannelForm;