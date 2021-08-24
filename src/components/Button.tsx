import "./Button.css";

export enum ButtonType {
  main = "main",
  secondary = "secondary",
}

export interface BaseButtonProps {
  onClick: (e?: any) => void;
  children: any;
}


export interface ButtonProps extends BaseButtonProps {
  type: ButtonType;
  disabled?: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  let className = `${props.type}-button`;
  if (props.disabled) {
    className += ` disabled`;
  }
  if (props.className) {
    className += ` ${props.className}`;
  }
  const shouldFireClickEvents = (e: any) => {
    e.preventDefault();
    if (!props.disabled) props.onClick(e);
  };
  return (
    <div onClick={shouldFireClickEvents} className={className}>
      {props.children}
    </div>
  );
}

export function SquareMainButton(props: BaseButtonProps) {
  return <Button {...props} type={ButtonType.main} className="square">{props.children}</Button>
}