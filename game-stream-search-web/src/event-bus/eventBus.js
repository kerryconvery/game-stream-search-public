import React, { useEffect, useRef } from 'react';
import _forIn from 'lodash/forIn';

const eventBus = {
  addEventListener: (event, callback) => document.addEventListener(event, e => callback(e.detail)),
  dispatchEvent: (event, data) => document.dispatchEvent(new CustomEvent(event, { detail: data })),
  removeEventListener: (event, callback) => document.removeEventListener(event, callback),
}

const useEventBus = (subscribers = {}) => {
  const unmounting = useRef(false);
  const listeners = [];

  const eventListenerProxy = eventListener => event => {
    if (!unmounting.current) {
      eventListener(event);
    }
  }

  useEffect(() => {
    _forIn(subscribers, (value, key) => {
      const listener = eventListenerProxy(value);
      eventBus.addEventListener(key, listener);
      listeners.push({ [key]: listener });
    });

    return () => {
      unmounting.current = true;
      _forIn(listeners, (value, key) => eventBus.removeEventListener(key, value));
    }
  }, []);

  return { dispatchEvent: eventBus.dispatchEvent };
}

export default useEventBus;