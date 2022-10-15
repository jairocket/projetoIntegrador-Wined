import "./styles.css";

interface ButtonProps {
  className: string;
  type: "button" | "submit" | "reset";
  name: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.className} type={props.type}>
      {props.name}
    </button>
  );
}
