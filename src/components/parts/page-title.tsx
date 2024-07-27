import { twMerge } from 'tailwind-merge';

interface TitleProps {
  text: string;
  className?: string;
}
export default function PageTitle({ text, className='' }: TitleProps) {
  const classes = twMerge('text-3xl blue-dark', className)
  return <div className={classes}>{text}</div>;
}
