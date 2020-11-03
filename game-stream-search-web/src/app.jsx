import React from 'react';
import ApplicationTemplate from './templates/ApplicationTemplate';
import GameStreamListPage from './game-stream-list-page/GameStreamListPage';
import AlertRenderer from './notifications/AlertRenderer';

const App = () => (
  <ApplicationTemplate alertRenderer={<AlertRenderer />} >
    <GameStreamListPage />
  </ApplicationTemplate>
)

export default App;