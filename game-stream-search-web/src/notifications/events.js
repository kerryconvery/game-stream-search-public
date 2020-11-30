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

export const buildOfflineAlertEvent = () => (
  createEvent('alert', {
    severity: 'error',
    message: 'The application is currently offline. Please try back later.'
  })
);

export const buildToastEvent = message => createEvent('toast', { message });

export const postNotificationEvent = (dispatcher, event) => dispatcher(event.eventType, event.body);