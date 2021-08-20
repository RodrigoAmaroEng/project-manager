import React, { useState } from "react";
import "./Menu.css";

export function MenuItem(props: any) {
  let className = props.selected ? "selected" : "";
  return (
    <li onClick={props.onClick} className={className}>
      <span>{props.name}</span> <div className="counter">{props.count}</div>
    </li>
  );
}

export default function Menu(props: any) {
  const [selected, setSelected] = useState(-1);
  return (
    <ul className="menu">
      {React.Children.map(props.children, (child: any, index: number) =>
        React.cloneElement(child, {
          selected: index === selected,
          onClick: () => setSelected(index),
        })
      )}
    </ul>
  );
}