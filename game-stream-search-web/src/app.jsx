import React from 'react';
import ApplicationTemplate from './templates/ApplicationTemplate';
import GameStreamListPage from './game-stream-list-page/GameStreamListPage';
import AlertNotificationProvider from './providers/AlertNotificationProvider';
import AlertRenderer from './notifications/AlertRenderer';

const App = () => (
  <AlertNotificationProvider>
  {alerts => (
    <ApplicationTemplate alertRenderer={<AlertRenderer alerts={alerts} />} >
      <GameStreamListPage />
    </ApplicationTemplate>
  )}
  </AlertNotificationProvider>
)

export default App;