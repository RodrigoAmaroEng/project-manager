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
  const page = window.location.pathname.replace(/\/project\/stored/, "");
  return (
    <ul className="menu">
      {React.Children.map(props.children, (child: any) =>
        React.cloneElement(child, {
          selected:
            page
              .toLocaleLowerCase()
              .indexOf(child.props.name.toLocaleLowerCase()) > -1,
          onClick: () => props.onChange(child.props.name.toLocaleLowerCase()),
        })
      )}
    </ul>
  );
}
