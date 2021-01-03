import useFormController from '../../../../components/form/useFormController';
import { validateForm, mapApiErrorsToFields } from './AddChannelFormView';
import { useGameStreamApi } from '../../../../api/gameStreamApi';
import useEventBus from '../../../../event-bus/eventBus';
import { postNotificationEvent, buildToastEvent } from '../../../../notifications/events';

const useAddChannelFormController = (onSaveSuccess) => {
  const { addChannel, mapHttpResponse } = useGameStreamApi();
  const { dispatchEvent } = useEventBus();

  const handleSendSuccessNotifcation = (result, formValues) => {
    postNotificationEvent(
      dispatchEvent,
      buildToastEvent(`Channel ${formValues.channelName} ${result.created ? 'added' : 'updated'} successfully`),
    );
  }

  const handleSaveChannel = async (formValues) => {
    const response = await addChannel(formValues);
    return mapHttpResponse(response, mapApiErrorsToFields);
  }

  return useFormController(validateForm, handleSaveChannel, handleSendSuccessNotifcation, onSaveSuccess);
}

export default useAddChannelFormController;