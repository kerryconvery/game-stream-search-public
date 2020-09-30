import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import ClientRegistrationFormFields from './clientRegistrationFormFields';


describe('When validating client registration fields', () => {
  it('should return validation errors when required fields are missing', () => {
    const client = {};

    const validationErrors = ClientRegistrationFormFields.validateFields(client);
    
    expect(validationErrors.title).toBeDefined();
    expect(validationErrors.firstName).toBeDefined();
    expect(validationErrors.lastName).toBeDefined();
    expect(validationErrors.phoneNumber).toBeDefined();
  });

  it('should return no validation errors when all required fields are present', () => {
    const client = {
      title: 'Mr',
      firstName: 'Client',
      lastName: 'One',
      phoneNumber: '12122'
    };

    const validationErrors = ClientRegistrationFormFields.validateFields(client);
    
    expect(validationErrors).toEqual({});
  });
})

describe('When there are validation errros', () => {
  const baseProps = {
    client: {},
    validationErrors: {},
    onChange: jest.fn(),
  }

  it('should display the errors against their respective controls', () => {
    const validationErrors = ClientRegistrationFormFields.validateFields({});

    const props = {
      ...baseProps,
      validationErrors,
    }
    
    const component = shallow(<ClientRegistrationFormFields { ...props } />)

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should not display errors when there are not validation errors', () => {    
    const component = shallow(<ClientRegistrationFormFields { ...baseProps } />)

    expect(shallowToJson(component)).toMatchSnapshot();
  });
})