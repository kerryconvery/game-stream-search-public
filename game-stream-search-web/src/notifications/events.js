import { v4 as uuidv4 } from 'uuid';

const createEvent = (eventType, body) => (
  {
    eventType,
    body: {
      id: uuidv4(),
      ...body,
    }
  }
);

const dispatchEvent = (eventType, body, dispatcher) => {
  const event = createEvent(eventType, body);

  dispatcher(event.eventType, event.body);
}

const dispatchToastEvent = (message, dispatcher) => {
  dispatchEvent('toast', { message }, dispatcher);
}

const dispatchAlertEvent = severity => (message, dispatcher) => { 
  dispatchEvent('alert', { severity, message }, dispatcher);
}

const dispatchErrorAlertEvent = dispatchAlertEvent('error');

export const notifyApplicationIsOffline = dispatcher => () => {
  dispatchErrorAlertEvent('The application is currently offline. Please try back later.', dispatcher);
}

export const notifyFeaturedChannelsUpdated = (channelName, channelAdded, dispatcher) => {
  dispatchToastEvent(`Channel ${channelName} ${channelAdded ? 'added' : 'updated'} successfully`, dispatcher);
}