import React, { useEffect, useState } from "react";
import "./DropDown.css";

export function Option(props: any) {
  // React.Children.only(props.children)
  return <div className="dropdown-option" onClick={props.onClick}>{props.children}</div>;
}

export default function DropDown(props: any) {
  const [isOpen, setOpen] = useState(false);
  const getSelectedIndex = (item:any) => {
    if (!props.selected) return -1
    return React.Children.toArray(props.children).findIndex((child:any )=> child.props.item === item) ?? -1
  }
  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex(props.selected));
  const render = props.onRender || ((item:any) => item)
  useEffect(() => {
    setSelectedIndex(getSelectedIndex(props.selected))
  }, [props.selected])
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
