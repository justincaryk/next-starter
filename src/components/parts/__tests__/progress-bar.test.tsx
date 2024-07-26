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

    const expectedClasses = [scoreStyle[0],scoreStyle[0],scoreStyle[0],scoreStyle[0]] as string[];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 1', () => {
    render(<ProgressBar score={1} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [scoreStyle[1],scoreStyle[0],scoreStyle[0],scoreStyle[0]] as string[];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 2', () => {
    render(<ProgressBar score={2} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [scoreStyle[2],scoreStyle[2],scoreStyle[0],scoreStyle[0]] as string[];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 3', () => {
    render(<ProgressBar score={3} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [scoreStyle[3],scoreStyle[3],scoreStyle[3],scoreStyle[0]] as string[];

    verifyClassNames(divElements, expectedClasses);
  });

  it('renders the correct classes for score 4', () => {
    render(<ProgressBar score={4} />);

    const progressBar = screen.getAllByRole('progressbar');
    const divElements = within(progressBar[0]).getAllByTestId('progress-bar-segment');

    const expectedClasses = [scoreStyle[4],scoreStyle[4],scoreStyle[4],scoreStyle[4]] as string[];

    verifyClassNames(divElements, expectedClasses);
  });
});
