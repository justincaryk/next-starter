import classnames from 'classnames';

interface CardProps {
  onClick?: () => void;
  active?: boolean;
  children?: string | React.ReactNode;
}

export default function Card({ onClick, active, children }: CardProps) {
  const baseStyles = 'rounded-lg px-4 py-2 cursor-pointer shadow-md border';
  const inactiveStyles = 'border-green-md text-green-md';
  const hoverStyles = 'hover:bg-green-md hover:text-white hover:border-green-md';
  const activeStyles = 'border-blue-dark bg-blue-dark text-blue-md';

  return (
    <div
      className={classnames({
        [baseStyles]: true,
        [hoverStyles]: true,
        [inactiveStyles]: !active,
        [activeStyles]: active,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
