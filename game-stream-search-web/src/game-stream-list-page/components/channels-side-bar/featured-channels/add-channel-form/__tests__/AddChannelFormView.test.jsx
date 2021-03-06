import React from 'react';
import { render, screen } from '@testing-library/react';
import AddChannelFormView, { validateForm, mapApiErrorsToFields } from '../AddChannelFormView';
import '@testing-library/jest-dom/extend-expect';

describe('Add Channel Form', () => {
  it('should match the snapshot', () => {
    const { container } = renderForm(baseProps);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display the channel name field label as channel id when youtube is selected', () => {
    renderForm({ ...baseProps, formValues: { streamPlatform: 'YouTube' } });

    expect(screen.getByText('Channel id')).toBeInTheDocument();
  });

  it('should display the channel name label as channel name when youtube is not selected', () => {
    renderForm({ ...baseProps, formValues: { streamPlatform: 'Twitch' } });

    expect(screen.getByText('Channel name')).toBeInTheDocument();
  });

  it('should display the channel name label as channel name by default', () => {
    renderForm(baseProps);

    expect(screen.getByText('Channel name')).toBeInTheDocument();
  });

  const baseProps = {
    isSaving: false,
    onChange: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
  }

  const renderForm = (props) => {
    return render(<AddChannelFormView {...props} />)
  }
})

describe('Validate add channel form', () => {
  it('should return the channel name field name as channel id when the stream platform is YouTube', () => {
    const errors = validateForm({ streamPlatform: 'YouTube' });

    expect(errors.channelName.message).toEqual("Please enter a channel id");
    expect(errors.channelName.code).toEqual("ChannelNameMissing");
  });

  it('should return the channel name field name as channel name when the stream platform is not YouTube', () => {
    const errors = validateForm({ streamPlatform: 'Twitch' });

    expect(errors.channelName.message).toEqual("Please enter a channel name");
    expect(errors.channelName.code).toEqual("ChannelNameMissing");
  });
});

describe('Map Api errors to form fields', () => {
  it('should return an error message and error code from the API error', () => {
    const errors = mapApiErrorsToFields([
      { 
        errorCode: 'ChannelNotFoundOnPlatform',
        errorMessage: 'Test error message'
      }
    ]);

    expect(errors.channelName.message).toEqual("Test error message");
    expect(errors.channelName.code).toEqual("ChannelNotFoundOnPlatform");
  });

  it('should return an empty object when there are no known error types', () => {
    const errors = mapApiErrorsToFields([
      { 
        errorCode: 'UnknownError',
        errorMessage: 'Unknown error'
      }
    ]);

    expect(errors).toEqual({});
  });
});