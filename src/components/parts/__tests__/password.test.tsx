import '@testing-library/jest-dom';

import { FieldError } from 'react-hook-form';

import { fireEvent, render, screen } from '@testing-library/react';
import Password from '../form/password';

describe('Password Component', () => {
  const baseInputProps = {
    name: 'password',
    type: 'password',
    errors: {} as FieldError,
  };

  it('should render a password input with a toggle icon', () => {
    const { container } = render(<Password {...baseInputProps} />);

    // password type inputs do not have role='textbox'
    const inputElement = container.querySelector('input');
    const iconElement = screen.getByRole('img', { name: 'show password' });

    expect(inputElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should toggle password visibility when icon is clicked', () => {
    const { container } = render(<Password {...baseInputProps} />);

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
