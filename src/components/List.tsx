import React, { useEffect, useState } from "react";
import "./List.css";
import "../extras/extension-functions";

interface RowProp {
  item: any;
  children: any;
}

export function Row(props: RowProp) {
  return <div className="row-content">{props.children}</div>;
}

export function IfEmpty(props: any) {
  return <span>{props.children}</span>;
}

export function Action(props: any) {
  React.Children.only(props.children);
  const event = props.children.props.onClick
  const newEvent = { onClick: () => event(props.item) };
  return (
    <div className="list-action">
      {React.cloneElement(props.children, newEvent)}
    </div>
  );
}

export enum ListStyle {
  Normal,
  Clickable,
  SingleSelect,
  MultiSelect,
}

class SelectedItem {
  index: number;
  item: any;
  constructor(index: number, item: any) {
    this.index = index;
    this.item = item;
  }
}

interface ListProps {
  onClick?: (row: SelectedItem) => void;
  onSelectionChange?: (rows: Array<SelectedItem>) => void;
  listStyle: ListStyle;
  children?: any[];
  className?: string;
}

export default function List(props: ListProps) {
  const [selectedItems, setSelectedItems] = useState(new Array<SelectedItem>());
  const onClick = (row: any, index: number) => {
    if (props.listStyle === ListStyle.Clickable) {
      if (props.onClick) props.onClick(new SelectedItem(index, row));
    } else if (props.listStyle === ListStyle.SingleSelect) {
      setSelectedItems([new SelectedItem(index, row)]);
    } else if (props.listStyle === ListStyle.MultiSelect) {
      const item = selectedItems.findIndex(
        (it: SelectedItem) => it.index === index
      );
      if (item >= 0) {
        setSelectedItems(selectedItems.splice(item, 1));
      } else {
        let items = [...selectedItems];
        items.push(new SelectedItem(index, row));
        setSelectedItems(items);
      }
    }
  };

  useEffect(() => {
    if (props.onSelectionChange) props.onSelectionChange(selectedItems);
  }, [selectedItems]);

  const markSelected = (index: number) =>
    selectedItems.findIndex((it: SelectedItem) => it.index === index) >= 0
      ? " selected"
      : "";

  const actions = React.Children.toArray(props.children).filter(
    (item: any) => item.type && item.type.name === "Action"
  );

  const mapChildren = () => {
    return React.Children.toArray(props.children!)
      .filter((row: any) => row.type && row.type.name === "Row")
      .map((row: any, index: number) => (
        <div
          className={`row${markSelected(index)}`}
          onClick={() => onClick(row, index)}
        >
          {row}
          {actions.map((action: any) =>
            React.cloneElement(action, { item: row.props.item })
          )}
        </div>
      ));
  };

  if (props.children) {
    const rows = mapChildren();
    if (rows.length > 0) {
      return (
        <div className={`list-container ${props.className}`}>
          <div className="list-container-scroller">
            {(props.children || selectedItems) && mapChildren()}
          </div>
        </div>
      );
    }
  }
  return (
    <div className={`list-container-empty ${props.className}`}>
      {(props.children &&
        props.children?.first(
          (item) => item.type && item.type.name === "IfEmpty"
        )) ||
        "No items to show"}
    </div>
  );
}
