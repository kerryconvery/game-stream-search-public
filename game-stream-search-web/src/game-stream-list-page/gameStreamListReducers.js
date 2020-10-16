import _get from 'lodash/get';

export const UPDATE = 'update';
export const CLEAR = 'clear';

const streamsReducer = (streams, action) => {
  var items = _get(streams, 'items', []);

  switch(action.type) {
    case UPDATE: {
      return {
        items: items.concat(action.data.items),
        nextPageToken: action.data.nextPageToken,
      }
    }
    case CLEAR: {
      return {}
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
}

export default streamsReducer;