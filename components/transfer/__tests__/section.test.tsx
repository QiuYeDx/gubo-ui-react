import React from 'react';

import type { KeyWiseTransferItem } from '..';
import { fireEvent, render } from '../../../tests/utils';
import type { TransferListProps } from '../Section';
import Section from '../Section';

const listCommonProps: TransferListProps<KeyWiseTransferItem> = {
  classNames: {},
  styles: {},
  prefixCls: 'g-transfer',
  dataSource: [
    { key: 'a', title: 'a' },
    { key: 'b', title: 'b' },
    { key: 'c', title: 'c', disabled: true },
  ],
  checkedKeys: ['a'],
  notFoundContent: 'Not Found',
} as TransferListProps<KeyWiseTransferItem>;

const listProps: TransferListProps<KeyWiseTransferItem> = {
  ...listCommonProps,
  dataSource: undefined as unknown as KeyWiseTransferItem[],
};

const emptyListProps: TransferListProps<KeyWiseTransferItem> = {
  ...listCommonProps,
  dataSource: [],
};

describe('Transfer.List', () => {
  it('should render correctly', () => {
    const { container } = render(<Section {...listCommonProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should check top Checkbox while all available items are checked', () => {
    const { container } = render(<Section {...listCommonProps} checkedKeys={['a', 'b']} />);
    expect(
      container.querySelector<HTMLInputElement>('.g-transfer-list-header input[type="checkbox"]')
        ?.checked,
    ).toBeTruthy();
  });

  it('should render correctly when dataSource is not exists', () => {
    expect(() => {
      render(<Section {...listProps} />);
    }).not.toThrow();
  });

  it('Checkbox should disabled when dataSource is empty', () => {
    const { container } = render(<Section {...emptyListProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.g-checkbox-wrapper')).toHaveClass(
      'g-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.g-checkbox')).toHaveClass(
      'g-checkbox-disabled',
    );
  });

  it('Checkbox should not disabled when dataSource not is empty', () => {
    const { container } = render(<Section {...listCommonProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.g-checkbox-wrapper')).not.toHaveClass(
      'g-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.g-checkbox')).not.toHaveClass(
      'g-checkbox-disabled',
    );
  });

  it('should disabled all select checkbox when each item of dataSource is disabled', () => {
    const allDisabledListProps: TransferListProps<KeyWiseTransferItem> = {
      ...listCommonProps,
      dataSource: listCommonProps.dataSource.map((d) => ({
        ...d,
        disabled: true,
      })),
    };
    const { container } = render(<Section {...allDisabledListProps} />);
    expect(container.querySelector<HTMLLabelElement>('label.g-checkbox-wrapper')).toHaveClass(
      'g-checkbox-wrapper-disabled',
    );
    expect(container.querySelector<HTMLSpanElement>('span.g-checkbox')).toHaveClass(
      'g-checkbox-disabled',
    );
  });

  it('support custom dropdown Icon', () => {
    const { container } = render(
      <Section
        {...listCommonProps}
        selectionsIcon={<span className="test-dropdown-icon">test</span>}
      />,
    );
    expect(
      container?.querySelector<HTMLSpanElement>(
        '.g-transfer-section .g-transfer-list-header .test-dropdown-icon',
      ),
    ).toBeTruthy();
  });

  it('onItemSelect should be called correctly', () => {
    const onItemSelect = jest.fn();
    const { container } = render(
      <Section
        {...listCommonProps}
        onItemSelect={onItemSelect}
        renderList={(props) => (
          <div
            className="custom-list-body"
            onClick={(e) => {
              props.onItemSelect('a', false, e);
            }}
          >
            custom list body
          </div>
        )}
      />,
    );
    fireEvent.click(container.querySelector('.custom-list-body')!);
    expect(onItemSelect).toHaveBeenCalledWith('a', false);
  });
});
