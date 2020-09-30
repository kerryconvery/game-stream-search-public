import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import ClientList from './clientList'

describe('When displaying a list of clients', () => {
  it('should display a skeleton when there are no clients', () => {
    const props = {}
    const component = shallow(<ClientList { ...props } />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should display a list of clients when there are clients', () => {
    const props = {
      clients: [{
        title: 'Mr',
        firstName: 'Client',
        lastName: 'One',
        phoneNumber: '12122'
      }],
    }
  
    const component = shallow(<ClientList { ...props } />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });
})