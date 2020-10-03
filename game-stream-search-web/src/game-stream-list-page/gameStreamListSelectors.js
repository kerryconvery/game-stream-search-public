const gameStreamListSelector = streams => streams.map(stream => ({
  ...stream
}));

export default gameStreamListSelector;