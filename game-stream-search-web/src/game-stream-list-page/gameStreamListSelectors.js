const addStreams = (streams, newStreams) => {
  if (!streams) {
    return newStreams;
  }
  
  return {
    items: streams.items.concat(newStreams.items),
    nextPageToken: newStreams.nextPageToken,
  }
}

export default addStreams;