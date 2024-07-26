import { isEmptyString } from '../utils';

interface LabelProps {
  text: string;
  htmlFor: string;
  onClick?: () => void;
}

export default function Label({ text, htmlFor, onClick }: LabelProps) {
  if (isEmptyString(htmlFor)) {
    throw new Error('htmlFor cannot be an empty string as it breaks accessibility');
  }

  return (
    <label onClick={onClick} {...(!text ? { className: 'sr-only' } : {})} htmlFor={htmlFor}>
      {text}
    </label>
  );
}
