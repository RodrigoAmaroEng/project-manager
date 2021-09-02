import "./Button.css";

export enum ButtonType {
  main = "main",
  secondary = "secondary",
}

export interface BaseButtonProps {
  onClick: (e?: any) => void;
  children: any;
  disabled?: boolean; 
}

export interface BaseButtonPropsWithClass extends BaseButtonProps {
  className?: string;
}

export interface ButtonProps extends BaseButtonPropsWithClass {
  type: ButtonType;
}

export default function Button(props: ButtonProps) {
  let className = `base-button ${props.type}`;
  if (props.disabled) {
    className += ` disabled`;
  }
  if (props.className) {
    className += ` ${props.className}`;
  }
  const shouldFireClickEvents = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!props.disabled) props.onClick(e);
  };
  return (
    <div onClick={shouldFireClickEvents} className={className}>
      {props.children}
    </div>
  );
}

export function MainButton(props: BaseButtonPropsWithClass) {
  return <Button {...props} type={ButtonType.main} className={props.className}>{props.children}</Button>
}
export function SecondaryButton(props: BaseButtonPropsWithClass) {
  return <Button {...props} type={ButtonType.secondary} className={props.className}>{props.children}</Button>
}

export function SquareMainButton(props: BaseButtonProps) {
  return <MainButton {...props} className="square">{props.children}</MainButton>
}
export function SquareSecondaryButton(props: BaseButtonProps) {
  return <SecondaryButton {...props} className="square">{props.children}</SecondaryButton>
}