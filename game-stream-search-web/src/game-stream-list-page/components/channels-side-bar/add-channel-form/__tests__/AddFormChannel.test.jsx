import React from 'react';
import { render } from '@testing-library/react';
import AddChannelForm from '../AddChannelForm';

describe('Add Channel Form', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <AddChannelForm
        isSaving={false}
        onChange={jest.fn()}
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
})