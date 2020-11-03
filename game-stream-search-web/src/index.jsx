import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import config from '../config.json';
import { ConfigurationProvider } from './providers/ConfigurationProvider';

ReactDOM.render(
  /* eslint-disable-next-line no-undef */
  <ConfigurationProvider configuration={config.env[process.env.APP_ENV]} >
    <App />
  </ConfigurationProvider>,
  document.getElementById('app')
);
