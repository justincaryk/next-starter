import classnames from 'classnames';

interface ProgressProps {
  score: 0 | 1 | 2 | 3 | 4;
}

export const scoreStyle = {
  zero: 'bg-gray-400',
  one: 'bg-red-error',
  two: 'bg-orange-pop',
  three: 'bg-green-md',
  four: 'bg-blue-light',
};

export default function ProgressBar({ score }: ProgressProps) {
  const baseStyle = 'h-2 w-full';

  return (
    <div
      className="w-full h-2 flex flex-row"
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label={`Progress: ${score} out of 4`}
    >
      <div
        className={classnames({
          [baseStyle]: true,
          [scoreStyle.zero]: score === 0,
          [scoreStyle.one]: score === 1,
          [scoreStyle.two]: score === 2,
          [scoreStyle.three]: score === 3,
          [scoreStyle.four]: score === 4,
        })}
        data-testid="progress-bar-segment"
      />
      <div
        className={classnames({
          [baseStyle]: true,
          [scoreStyle.zero]: score < 2,
          [scoreStyle.two]: score === 2,
          [scoreStyle.three]: score === 3,
          [scoreStyle.four]: score === 4,
        })}
        data-testid="progress-bar-segment"
      />
      <div
        className={classnames({
          [baseStyle]: true,
          [scoreStyle.zero]: score < 3,
          [scoreStyle.three]: score === 3,
          [scoreStyle.four]: score === 4,
        })}
        data-testid="progress-bar-segment"
      />
      <div
        className={classnames({
          [baseStyle]: true,
          [scoreStyle.zero]: score < 4,
          [scoreStyle.four]: score === 4,
        })}
        data-testid="progress-bar-segment"
      />
    </div>
  );
}
