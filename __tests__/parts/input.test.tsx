import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import Input from '../../src/components/parts/input';

describe('Input', () => {
  it('should render an input element', () => {
    const { container } = render(<Input />);

    const input = container.querySelector('input')

    expect(input).toBeTruthy();

  });
});
