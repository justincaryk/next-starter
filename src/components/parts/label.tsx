import { isEmptyString } from '../utils';

interface LabelProps {
  text: string;
  htmlFor: string;
}

export default function Label({ text, htmlFor }: LabelProps) {
  if (isEmptyString(htmlFor)) {
    throw new Error('htmlFor cannot be an empty string as it breaks accessibility');
  }

  return (
    <label {...(!text ? { className: 'sr-only' } : {})} htmlFor={htmlFor}>
      {text}
    </label>
  );
}
