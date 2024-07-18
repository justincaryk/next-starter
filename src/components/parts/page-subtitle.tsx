interface TitleProps {
  text: string;
}
export default function PageSubtitle({ text }: TitleProps) {
  return <div className="text-blue-dark text-muted">{text}</div>;
}
