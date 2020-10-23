import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useEventBus from '../eventBus';

describe('Event bus subscribers', () => {
  it('should receive messages sent from publishers', () => {
    const subscriberA = jest.fn();
    const subscriberB = jest.fn();

    const subscribers = {
      'subscriberA': subscriberA,
      'subscriberB': subscriberB
    }

    const { result } = renderHook(() => useEventBus(subscribers));

    result.current.dispatchEvent('subscriberA', 'test event A');
    result.current.dispatchEvent('subscriberB', 'test event B');
    
    expect(subscriberA).toHaveBeenCalledWith('test event A');
    expect(subscriberB).toHaveBeenCalledWith('test event B');
  });

  it('should receive messages sent from publishers', () => {
    const subscriberA = jest.fn();

    const subscribers = {
      'subscriberA': subscriberA,
    }

    const { result, unmount } = renderHook(() => useEventBus(subscribers));

   unmount();

    result.current.dispatchEvent('subscriberA', 'test event A');
    
    expect(subscriberA).not.toHaveBeenCalledWith('test event A');
  });
})