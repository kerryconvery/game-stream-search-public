import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';
import _get from 'lodash/get';

const ConfigurationContext = createContext({});

export const ConfigurationProvider = ({ children }) => (
  <ConfigurationContext.Provider>
    {children}
  </ConfigurationContext.Provider>
);

ConfigurationProvider.propTypes = {
  children: node.isRequired,
}

export const useConfiguration = (path) => {
  const configuration = useContext(ConfigurationProvider);

  return _get(configuration, path);
}