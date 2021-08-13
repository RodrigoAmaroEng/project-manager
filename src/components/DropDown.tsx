import React, { useState } from "react";
import "./DropDown.css";

export function Option(props: any) {
  // React.Children.only(props.children)
  return <div className="dropdown-option" onClick={props.onClick}>{props.children}</div>;
}

export default function DropDown(props: any) {
  const [isOpen, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const render = props.onRender || ((item:any) => item)

  return (
    <div className={`dropdown-container ${props.className} ${isOpen ? "open" : "close"}`}>
      <div
        className={`dropdown`}
        onClick={() => setOpen(!isOpen)}
      >
        <div className="dropdown-selected-item">
          {props.children[selectedIndex] && render(props.children[selectedIndex].props.item)}
        </div>
      </div>
      <div className="dropdown-option-container">
          <div className="dropdown-option-scroller">
            {React.Children.map(props.children, (child, index) =>
              React.cloneElement(child, {
                onClick: () => {
                  setSelectedIndex(index);
                  props.onSelect(child.props.item);
                  setOpen(false);
                },
              })
            )}
          </div>
        </div>
    </div>
  );
}
