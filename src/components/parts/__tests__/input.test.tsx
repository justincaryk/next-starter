import '@testing-library/jest-dom';

import { FieldError } from 'react-hook-form';

import { render, screen } from '@testing-library/react';
import Input from '../form/input';

describe('Input Component', () => {
  const baseInputProps = {
    name: 'username',
    errors: {} as FieldError,
  };

  it('should render an input element', () => {
    const { container } = render(<Input />);

    const input = container.querySelector('input');

    expect(input).toBeTruthy();
  });

  it('should render with aria-invalid if errors are provided', () => {
    const errorProps = {
      ...baseInputProps,
      errors: { message: 'Error message' } as FieldError,
    };
    render(<Input type="text" {...errorProps} />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render with aria-invalid if no errors are provided', () => {
    render(<Input type="text" {...baseInputProps} />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('aria-invalid', 'false');
  });

  it('should render a text input without a toggle icon', () => {
    render(<Input type="text" {...baseInputProps} />);

    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(screen.queryByRole('img')).toBeNull();
  });
});
