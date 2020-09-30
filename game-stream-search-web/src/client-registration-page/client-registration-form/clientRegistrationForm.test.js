import React from 'react';
import { mount } from 'enzyme';
import ClientRegistrationForm from './clientRegistrationForm';

describe('When registering the client', () => {
  const baseProps = {
    client: {},
    validationErrors: {},
    onRegister: jest.fn(),
    onCancel: jest.fn(),
    onValidationFailed: jest.fn(),
    onChange: jest.fn(),
  }

  it('should not try to register the client if there are validation errors', () => {
    const component = mount(<ClientRegistrationForm { ...baseProps } />);

    const button = component.find({ children: 'Register' });

    button.find('button').simulate('click');

    expect(baseProps.onValidationFailed).toHaveBeenCalled();
    expect(baseProps.onRegister).not.toHaveBeenCalled();
  });

  it('should register the client if there not are validation errors', () => {
    const props = {
      ...baseProps,
        client: {
        title: 'Mr',
        firstName: 'Client',
        lastName: 'One',
        phoneNumber: '12122'
      }
    }
    const component = mount(<ClientRegistrationForm { ...props } />);

    const button = component.find({ children: 'Register' });

    button.find('button').simulate('click');

    expect(baseProps.onRegister).toHaveBeenCalled();
  });
})