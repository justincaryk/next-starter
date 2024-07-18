import classnames from 'classnames';
import { BaseHTMLAttributes, KeyboardEvent } from 'react';

interface CardProps extends BaseHTMLAttributes<HTMLLIElement> {
  onClick?: () => void;
  i: number;
  active?: boolean;
  children?: string | React.ReactNode;
}

export default function Card({ onClick, i, active, children }: CardProps) {
  const baseStyles = 'rounded-lg px-4 py-2 cursor-pointer shadow-md border';
  const inactiveStyles = 'border-green-md text-green-md';
  const hoverStyles = 'hover:bg-green-md hover:text-white hover:border-green-md';
  const activeStyles = 'border-blue-dark bg-blue-dark text-blue-md';

  const onEnter = (e: KeyboardEvent<HTMLLIElement>) => {
    if (onClick) {
      if (e.key === '13' || e.keyCode === 13) {
        onClick?.();
      }
    }
  };

  return (
    <li
      className={classnames({
        [baseStyles]: true,
        [hoverStyles]: true,
        [inactiveStyles]: !active,
        [activeStyles]: active,
      })}
      onClick={onClick}
      // accessibility
      {...(onClick
        ? {
            tabIndex: i + 1,
            role: 'button',
            onKeyDown: onEnter,
          }
        : {})}
    >
      {children}
    </li>
  );
}
