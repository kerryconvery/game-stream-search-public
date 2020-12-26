import React from 'react';
import _omit from 'lodash/omit';
import FormController from '../../../../components/form/FormController';
import { validateForm, mapApiErrorsToFields } from './AddChannelFormView';
import { useGameStreamApi } from '../../../../api/gameStreamApi';
import useEventBus from '../../../../event-bus/eventBus';
import { postNotificationEvent, buildToastEvent } from '../../../../notifications/events';

const AddChannelFormController = ({ onSaveSuccess, ...props }) => {
  const { addChannel, StatusType } = useGameStreamApi();
  const { dispatchEvent } = useEventBus();

  const handleSaveSucceess = async (result, formValues) => {
    postNotificationEvent(
      dispatchEvent,
      buildToastEvent(`Channel ${formValues.channelName} ${result.created ? 'added' : 'updated'} successfully`),
    );

    onSaveSuccess();
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
    <FormController
      {...props}
      onValidateForm={validateForm}
      onSaveForm={handleSaveChannel}
      onSaveSuccess={handleSaveSucceess}
    />
  );
}

AddChannelFormController.propTypes = {
  ..._omit(FormController.propTypes, ['onValidateForm', 'onSaveForm']),
};

export default AddChannelFormController;