import React from 'react';

import InputNumber from '..';
import { render } from '../../../tests/utils';

describe('addon', () => {
  it('disabled status when prefix is active', () => {
    const { container } = render(<InputNumber prefix="¥" defaultValue={100} disabled controls />);
    expect(container.querySelector('.g-input-number-disabled')).toBeTruthy();
  });

  it('disabled status when addon is active', () => {
    const { container } = render(
      <InputNumber
        prefix="¥"
        addonBefore="Before"
        addonAfter="After"
        defaultValue={100}
        disabled
        controls
      />,
    );
    expect(container.querySelector('.g-space-addon-disabled')).toBeTruthy();
    expect(container.querySelector('.g-input-number-disabled')).toBeTruthy();
  });

  it('disabled status when prefix and addon is active', () => {
    const { container } = render(
      <InputNumber
        prefix="¥"
        addonBefore="Before"
        addonAfter="After"
        defaultValue={100}
        disabled
        controls
      />,
    );
    expect(container.querySelector('.g-space-addon-disabled')).toBeTruthy();
    expect(container.querySelector('.g-input-number-disabled')).toBeTruthy();
  });
});
