import React, { createContext, useContext } from 'react';
import { node, object } from 'prop-types';

const ConfigurationContext = createContext({});

export const ConfigurationProvider = ({ configuration, children }) => (
  <ConfigurationContext.Provider value={ configuration }>
    {children}
  </ConfigurationContext.Provider>
);

ConfigurationProvider.propTypes = {
  configuration: object.isRequired,
  children: node.isRequired,
}

export const useConfiguration = () => useContext(ConfigurationContext);
