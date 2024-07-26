import { BaseHTMLAttributes, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends BaseHTMLAttributes<HTMLLIElement> {
  onClick?: () => void;
  i: number;
  active?: boolean;
  className?: string;
  children?: string | React.ReactNode;
}

export default function Card({ onClick, i, active = false, className = '', children }: CardProps) {
  const baseStyles = 'rounded-lg px-4 py-2 cursor-pointer shadow-md border';
  const hoverStyles = 'hover:bg-green-md hover:text-white hover:border-green-md';
  const inactiveStyles = 'border-green-md text-green-md';
  const activeStyles = 'border-blue-dark bg-blue-dark text-blue-md';

  const classes = twMerge(
    baseStyles,
    active ? activeStyles : inactiveStyles,
    hoverStyles,
    className,
  );

  const onEnter = (e: KeyboardEvent<HTMLLIElement>) => {
    if (onClick) {
      if (e.key === '13' || e.keyCode === 13) {
        onClick?.();
      }
    }
  };

  return (
    <li
      className={classes}
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
