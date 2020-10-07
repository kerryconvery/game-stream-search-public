import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import config from '../config.json';
import { ConfigurationProvider } from './providers/configurationProvider';

console.log('process.env.APP_ENV:', process.env.APP_ENV)
ReactDOM.render(
  <ConfigurationProvider configuration={config.env[process.env.APP_ENV]} >
    <App />
  </ConfigurationProvider>,
  document.getElementById('app')
);
