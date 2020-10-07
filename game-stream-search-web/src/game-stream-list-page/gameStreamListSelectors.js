import _get from 'lodash/get';

const addStreams = (streams, newStreams) => {
  var items = _get(streams, 'items', []);
  
  return {
    items: items.concat(newStreams.items),
    nextPageToken: newStreams.nextPageToken,
  }
}

export default addStreams;