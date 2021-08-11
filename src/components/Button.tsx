import { useEffect } from "react";
import "./Button.css";

export enum ButtonType {
  main = "main",
  secondary = "secondary",
}

export interface ButtonProps {
  onClick: () => void;
  children: any;
  type: ButtonType;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  let className = `${props.type}-button`;
  if (props.disabled) {
    className += ` disabled`;
  }
  const shouldFireClickEvents = () => {
    if (!props.disabled) props.onClick();
  };
  return (
    <button type="button" onClick={shouldFireClickEvents} className={className}>
      {props.children}
    </button>
  );
}
