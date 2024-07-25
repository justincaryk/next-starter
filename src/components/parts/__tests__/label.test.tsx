import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Label from '../label';

describe('Label component', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders the label with the correct text', () => {
    render(<Label text="Username" htmlFor="username-input" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  test('sets the htmlFor attribute correctly', () => {
    render(
      <>
        <Label text="Password" htmlFor="password-input" />
        <input type="password" id="password-input" />
      </>,
    );
    expect(screen.getByText('Password')).toHaveAttribute('for', 'password-input');
  });

  test('renders the label with an empty text', () => {
    const { container } = render(
      <div>
        <Label text="" htmlFor="empty-text-input" />
        <input type="text" id="empty-text-input" />
      </div>,
    );

    expect(container.querySelector('label')).toBeInTheDocument();
  });

  test('throws an error when htmlFor is an empty string', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const renderLabel = () => {
      render(<Label text="Empty For" htmlFor="" />);
    };

    expect(renderLabel).toThrow('htmlFor cannot be an empty string as it breaks accessibility');
  });
});
