import '@testing-library/jest-dom';

import React from 'react';

import { render, screen, within } from '@testing-library/react';
import ProgressBar, { scoreStyle } from '../progress-bar';

describe('ProgressBar Component', () => {
  const baseClass = 'h-2 w-full';

  const verifyClassNames = (elements: HTMLElement[], expectedClasses: string[]) => {
    elements.forEach((el, index) => {
      expect(el).toHaveClass(baseClass);
      expect(el).toHaveClass(expectedClasses[index]);
    });
  };

  it('renders the correct classes for score 0', () => {
    render(<ProgressBar score={0} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [
      scoreStyle.zero,
      scoreStyle.zero,
      scoreStyle.zero,
      scoreStyle.zero,
    ];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 1', () => {
    render(<ProgressBar score={1} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [
      scoreStyle.one,
      scoreStyle.zero,
      scoreStyle.zero,
      scoreStyle.zero,
    ];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 2', () => {
    render(<ProgressBar score={2} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [
      scoreStyle.two,
      scoreStyle.two,
      scoreStyle.zero,
      scoreStyle.zero,
    ];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 3', () => {
    render(<ProgressBar score={3} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [
      scoreStyle.three,
      scoreStyle.three,
      scoreStyle.three,
      scoreStyle.zero,
    ];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 4', () => {
    render(<ProgressBar score={4} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [
      scoreStyle.four,
      scoreStyle.four,
      scoreStyle.four,
      scoreStyle.four,
    ];

    verifyClassNames(divElements, expectedClasses);
  });
});
