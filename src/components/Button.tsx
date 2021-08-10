import "./Button.css"

export enum ButtonType {
  main = "main",
  secondary = "secondary",
}

export interface ButtonProps {
  onClick: () => void;
  children: any;
  type: ButtonType;
}

export default function CButton(props: ButtonProps) {
  return <button type="button" onClick={props.onClick} className={`${props.type}-button`}>{props.children}</button>
}