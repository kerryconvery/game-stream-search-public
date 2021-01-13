import React from 'react';
import ApplicationTemplate from './shared-components/ApplicationTemplate';
import GameStreamListPage from './game-stream-list-page/GameStreamListPage';
import AlertRenderer from './notifications/AlertRenderer';
import ToastRenderer from './notifications/ToastRenderer';

const App = () => (
  <ApplicationTemplate alertRenderer={<AlertRenderer />} toastRenderer={<ToastRenderer />}>
    <GameStreamListPage />
  </ApplicationTemplate>
)

export default App;