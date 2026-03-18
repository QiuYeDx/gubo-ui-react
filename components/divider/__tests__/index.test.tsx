import * as React from 'react';

import Divider from '..';
import type { Orientation } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TitlePlacement } from '../index';

describe('Divider', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider type="vertical">Bamboo</Divider>);
    expect(container.querySelector<HTMLSpanElement>('.g-divider-inner-text')).toBeFalsy();

    errSpy.mockRestore();
  });

  it('support string orientationMargin', () => {
    const { container } = render(
      <Divider titlePlacement="end" orientationMargin="10">
        test test test
      </Divider>,
    );
    expect(container?.querySelector<HTMLSpanElement>('.g-divider-inner-text')).toHaveStyle({
      marginRight: 10,
    });
  });

  it('support bool dashed', () => {
    const { container } = render(<Divider dashed>test test test</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.g-divider-dashed')).toHaveStyle({
      borderStyle: 'dashed',
    });
  });

  it('support string variant', () => {
    const { container } = render(<Divider variant="dotted">test dotted</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.g-divider-dotted')).toHaveStyle({
      borderStyle: 'dotted',
    });
  });

  it('should apply the componentSize of ConfigProvider', () => {
    const { container, rerender } = render(
      <ConfigProvider componentSize="medium">
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('.g-divider-md')).toBeTruthy();

    rerender(
      <ConfigProvider componentSize="small">
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('.g-divider-sm')).toBeTruthy();
  });

  it('support vertical size', () => {
    const { container, rerender } = render(<Divider type="vertical" size="medium" />);
    expect(container.querySelector<HTMLSpanElement>('.g-divider-md')).toBeTruthy();

    rerender(<Divider type="vertical" size="small" />);
    expect(container.querySelector<HTMLSpanElement>('.g-divider-sm')).toBeTruthy();
  });

  describe('orientation and placement attribute', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const testCases: Array<
      [
        params: [
          orientation?: Orientation | TitlePlacement,
          vertical?: boolean,
          type?: Orientation,
          titlePlacement?: TitlePlacement,
          orientationMargin?: number,
        ],
        expected: string,
      ]
    > = [
      [['right'], '.g-divider-with-text-end'],
      [['vertical', undefined, 'horizontal'], '.g-divider-vertical'],
      [[undefined, undefined, 'vertical'], '.g-divider-vertical'],
      [['center', undefined, undefined, 'left'], '.g-divider-with-text-start'],
      [['horizontal', true, undefined], '.g-divider-horizontal'],
      [[undefined, true, 'horizontal'], '.g-divider-vertical'],
      [['center', undefined, 'horizontal', 'left', 20], '.g-divider-with-text-start'],
    ];
    it.each(testCases)('with args %j should have %s node', (params, expected) => {
      const { container } = render(
        <Divider
          orientation={params[0] as Orientation}
          vertical={params[1]}
          type={params[2]}
          titlePlacement={params[3]}
          {...(params[4] && { orientationMargin: params[4] })}
        >
          Bamboo
        </Divider>,
      );
      expect(container.querySelector<HTMLSpanElement>(expected)).not.toBeNull();
      if (params[4]) {
        expect(container.querySelector<HTMLSpanElement>('.g-divider-inner-text')).toHaveStyle({
          marginInlineStart: `${params[4]}px`,
        });
      }
    });
  });
});
