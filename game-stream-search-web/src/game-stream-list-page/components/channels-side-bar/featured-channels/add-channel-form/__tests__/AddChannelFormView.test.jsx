import React from 'react';
import { render } from '@testing-library/react';
import AddChannelFormView from '../AddChannelFormView';

describe('Add Channel Form', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <AddChannelFormView
        isSaving={false}
        onChange={jest.fn()}
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
})