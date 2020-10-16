import streamsReducer, { UPDATE, CLEAR } from '../gameStreamListReducers';

describe('Streams reducer', () => {
  it('should return a list containing assign new streams when there are currently no streams', () => {
    const data = {
      items: [
        {
          streamTitle: 'fake stream',
        }
      ],
      nextPageToken: 'fake token',
    }

    const streams = streamsReducer({}, { type: UPDATE, data });

    expect(streams.items.length).toEqual(1);
    expect(streams.items[0].streamTitle).toEqual('fake stream');
    expect(streams.nextPageToken).toEqual('fake token');
  });

  it('should return a list containing old streams and new streams when there are existing streams', () => {
    const data = {
      items: [
        {
          streamTitle: 'new fake stream',
        }
      ],
      nextPageToken: 'new fake token',
    }

    const initialStreams = {
      items: [
        {
          streamTitle: 'fake stream',
        }
      ],
      nextPageToken: 'fake token',
    }

    const streams = streamsReducer(initialStreams, { type: UPDATE, data });

    expect(streams.items.length).toEqual(2);
    expect(streams.items[0].streamTitle).toEqual('fake stream');
    expect(streams.items[1].streamTitle).toEqual('new fake stream');
    expect(streams.nextPageToken).toEqual('new fake token');
  });

  it('should return a state object containing no items or next page token', () => {
    const initialStreams = {
      items: [
        {
          streamTitle: 'fake stream',
        }
      ],
      nextPageToken: 'fake token',
    }

    const streams = streamsReducer(initialStreams, { type: CLEAR });

    expect(streams.items).toBeUndefined();
    expect(streams.nextPageToken).toBeUndefined();
  })
})