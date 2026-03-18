import React from 'react';
import { render } from '@testing-library/react';

import type { InputProps } from '..';
import Input from '..';

const testClassNames = {
  root: 'custom-root',
  prefix: 'custom-prefix',
  input: 'custom-input',
  textarea: 'custom-textarea',
  suffix: 'custom-suffix',
  count: 'custom-count',
  separator: 'custom-separator',
  button: {
    root: 'custom-button-root',
    icon: 'custom-button-icon',
    content: 'custom-button-content',
  },
};

const testStyles = {
  root: { color: 'rgb(255, 0, 0)' },
  input: { color: 'rgb(0, 0, 255)' },
  textarea: { color: 'rgb(0, 255, 0)' },
  prefix: { color: 'rgb(255, 255, 0)' },
  suffix: { color: 'rgb(128, 0, 128)' },
  count: { color: 'rgb(255, 165, 0)' },
  separator: { color: 'rgb(255, 192, 203)' },
  button: {
    root: { color: 'rgb(255, 0, 0)' },
    icon: { color: 'rgb(0, 0, 255)' },
    content: { color: 'rgb(0, 255, 0)' },
  },
};

describe('Input.Semantic', () => {
  it('input should support classNames and styles', () => {
    const { container } = render(
      <Input
        value="123"
        showCount
        prefix="prefix"
        suffix="suffix"
        classNames={testClassNames}
        styles={testStyles}
      />,
    );

    const root = container.querySelector('.g-input-affix-wrapper');
    const input = container.querySelector('.g-input');
    const prefix = container.querySelector('.g-input-prefix');
    const suffix = container.querySelector('.g-input-suffix');
    const count = container.querySelector('.g-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('textarea should support classNames and styles', () => {
    const { container } = render(
      <Input.TextArea classNames={testClassNames} styles={testStyles} showCount />,
    );

    const root = container.querySelector('.g-input-textarea-affix-wrapper');
    const textarea = container.querySelector('textarea');
    const count = container.querySelector('.g-input-data-count');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(textarea).toHaveClass(testClassNames.textarea);
    expect(textarea).toHaveStyle(testStyles.textarea);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('search should support classNames and styles', () => {
    const { container, getByText } = render(
      <Input.Search
        loading
        enterButton="button text"
        classNames={testClassNames}
        styles={testStyles}
        showCount
        prefix="prefix"
        suffix="suffix"
      />,
    );

    const root = container.querySelector('.g-input-search');
    const input = container.querySelector('.g-input');
    const prefix = container.querySelector('.g-input-prefix');
    const suffix = container.querySelector('.g-input-suffix');
    const button = container.querySelector('.g-btn');
    const buttonIcon = container.querySelector('.g-btn-icon');
    const buttonContent = getByText('button text');
    const count = container.querySelector('.g-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(button).toHaveClass(testClassNames.button.root);
    expect(button).toHaveStyle(testStyles.button.root);
    expect(buttonIcon).toHaveClass(testClassNames.button.icon);
    expect(buttonIcon).toHaveStyle(testStyles.button.icon);
    expect(buttonContent).toHaveClass(testClassNames.button.content);
    expect(buttonContent).toHaveStyle(testStyles.button.content);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('password should support classNames and styles', () => {
    const { container } = render(
      <Input.Password
        classNames={testClassNames}
        styles={testStyles}
        showCount
        prefix="prefix"
        suffix="suffix"
      />,
    );
    const root = container.querySelector('.g-input-affix-wrapper');
    const input = container.querySelector('.g-input');
    const prefix = container.querySelector('.g-input-prefix');
    const suffix = container.querySelector('.g-input-suffix');
    const count = container.querySelector('.g-input-show-count-suffix');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(prefix).toHaveClass(testClassNames.prefix);
    expect(prefix).toHaveStyle(testStyles.prefix);
    expect(suffix).toHaveClass(testClassNames.suffix);
    expect(suffix).toHaveStyle(testStyles.suffix);
    expect(count).toHaveClass(testClassNames.count);
    expect(count).toHaveStyle(testStyles.count);
  });

  it('otp should support classNames and styles', () => {
    const { container } = render(
      <Input.OTP separator="-" classNames={testClassNames} styles={testStyles} />,
    );
    const root = container.querySelector('.g-otp');
    const input = container.querySelector('.g-input');
    const separator = container.querySelector('.g-otp-separator');
    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(input).toHaveClass(testClassNames.input);
    expect(input).toHaveStyle(testStyles.input);
    expect(separator).toHaveClass(testClassNames.separator);
    expect(separator).toHaveStyle(testStyles.separator);
  });

  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: InputProps['classNames'] = (info) => {
      if (info.props.disabled) {
        return { root: 'input-disabled' };
      }
      return { root: 'input-enabled' };
    };
    const styles: InputProps['styles'] = (info) => {
      if (info.props.size === 'large') {
        return { root: { background: 'red' } };
      }
      return { root: { background: 'blue' } };
    };

    const { rerender, container } = render(
      <Input size="large" classNames={classNames} styles={styles} />,
    );
    expect(container.querySelector('.g-input')).toHaveClass('input-enabled');
    expect(container.querySelector('.g-input')).toHaveStyle({ background: 'red' });

    rerender(<Input disabled classNames={classNames} styles={styles} />);
    expect(container.querySelector('.g-input')).toHaveClass('input-disabled');
    expect(container.querySelector('.g-input')).toHaveStyle({ background: 'blue' });
  });
});
