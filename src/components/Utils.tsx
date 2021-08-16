export function SpaceH() {
  return <span className="spacer-h" />;
}
export function SpaceV() {
  return <span className="spacer-v" />;
}

export function SpaceFill() {
  return <span className="fill-space" />;
}

export enum LineAlignment {
  left = "",
  center = "line-align-center",
  right = "line-align-right"
}

interface LineProps {
  children: any;
  align?: LineAlignment ;
}

export function Line(props: any) {
  return <div className={`util-line ${props.align || LineAlignment.left}`}>{props.children}</div>;
}
