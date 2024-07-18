interface TitleProps {
  text: string;
}
export default function PageTitle({ text }: TitleProps) {
  return <div className="text-3xl blue-dark">{text}</div>;
}
