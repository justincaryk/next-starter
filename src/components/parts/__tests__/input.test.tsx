import '@testing-library/jest-dom';

import { FieldError } from 'react-hook-form';

import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../input';

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

  it('should render a password input with a toggle icon', () => {
    const { container } = render(<Input type="password" {...baseInputProps} />);

    // password type inputs do not have role='textbox'
    const inputElement = container.querySelector('input');
    const iconElement = screen.getByRole('img', { name: 'show password' });

    expect(inputElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should toggle password visibility when icon is clicked', () => {
    const { container } = render(<Input type="password" {...baseInputProps} />);

    const inputElement = container.querySelector('input');
    const iconElement = screen.getByRole('img', { name: 'show password' });

    // Initial state
    expect(inputElement).toHaveAttribute('type', 'password');

    // Click to reveal password
    fireEvent.click(iconElement);
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(iconElement).toHaveAttribute('alt', 'hide password');

    // Click to hide password
    fireEvent.click(iconElement);
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(iconElement).toHaveAttribute('alt', 'show password');
  });
});
