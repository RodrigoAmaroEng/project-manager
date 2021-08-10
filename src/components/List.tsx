import { useState } from "react";
import "./List.css";

export function Row(props: any) {
  return <div className="row-content">{props.children}</div>;
}

export enum ListStyle {
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
  children: any;
}

export default function List(props: ListProps) {
  const [selectedItems, setSelectedItems] = useState(new Array<SelectedItem>());
  const onClick = (row: any, index: number) => {
    if (props.listStyle === ListStyle.Clickable) {
      if (props.onClick) props.onClick(new SelectedItem(index, row));
    } else if (props.listStyle === ListStyle.SingleSelect) {
      setSelectedItems([new SelectedItem(index, row)]);
      if (props.onSelectionChange) props.onSelectionChange(selectedItems);
    } else if (props.listStyle === ListStyle.MultiSelect) {
      const item = selectedItems.findIndex(
        (it: SelectedItem) => it.index === index
      );
      if (item >= 0) {
        setSelectedItems(selectedItems.splice(item, 1));
      } else {
        let items = [...selectedItems]
        items.push(new SelectedItem(index, row))
        setSelectedItems(items);
      }
      if (props.onSelectionChange) props.onSelectionChange(selectedItems); 
    }
  };

  const markSelected = (index: number) => selectedItems.findIndex(
    (it: SelectedItem) => it.index === index
  ) >= 0 ? " selected": ""

  const mapChildren = () => {
    if (props.children.length > 1) {
      return props.children
        .filter((row: any) => row.type.name === "Row")
        .map((row: any, index: number) => (
          <div className={`row${markSelected(index)}`} onClick={() => onClick(row, index)}>
            {row}
          </div>
        ));
    } else if (props.children.type.name === "Row") {
      return (
        <div className={`row${markSelected(0)}`} onClick={() => onClick(props.children, 0)}>
          {props.children}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="list-container">{(props.children || selectedItems) && mapChildren()}</div>
  );
}
