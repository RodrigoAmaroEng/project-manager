import React, { useEffect, useState } from "react";
import "./DropDown.css";

export function Option(props: any) {
  return (
    <div className="dropdown-option" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
interface RenderListProps {
  items: any[];
  displayProperty: string;
}
export function RenderList(props: RenderListProps) {
  return <span></span>;
}
interface RenderEnumProps {
  enum: Object;
}
export function RenderEnum(props: RenderEnumProps) {
  return <span></span>;
}

export default function DropDown(props: any) {
  const [isOpen, setOpen] = useState(false);
  let children: any = React.Children.toArray(props.children);
  if (children.length == 1) {
    let displayProperty = "";
    if (children[0].type.name == "RenderEnum") {
      children = Object.values(children[0].props.enum);
    } else if (children[0].type.name == "RenderList") {
      let temp = children[0]
      children = Object.values(temp.props.items);
      displayProperty = temp.props.displayProperty;
    }
    children = children.map((key: any) => (
      <Option item={key}>
        <h6>{displayProperty ? key[displayProperty] : key}</h6>
      </Option>
    ));
  }
  const getSelectedIndex = (item: any) => {
    if (!props.selected) return -1;
    return children.findIndex((child: any) => child.props.item === item) ?? -1;
  };
  const [selectedIndex, setSelectedIndex] = useState(
    getSelectedIndex(props.selected)
  );
  const render = props.onRender || ((item: any) => item);
  useEffect(() => {
    setSelectedIndex(getSelectedIndex(props.selected));
  }, [props.selected]);
  return (
    <div
      className={`dropdown-container ${props.className} ${
        isOpen ? "open" : "close"
      }`}
    >
      <div className={`dropdown`} onClick={() => setOpen(!isOpen)}>
        <div className="dropdown-selected-item">
          {children[selectedIndex] &&
            render(children[selectedIndex].props.item)}
        </div>
      </div>
      <div className="dropdown-option-container">
        <div className="dropdown-option-scroller">
          {children.map((child: any, index: number) =>
            React.cloneElement(child, {
              key: index,
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
