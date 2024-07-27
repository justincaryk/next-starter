import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
}
export default function PageTitle({ text, className = '' }: TitleProps) {
  const classes = twMerge('text-3xl blue-dark', className);
  return <div className={classes}>{text}</div>;
}
