import React, { useEffect, useState } from "react";
import { Direction, FieldType } from "../extras/models";
import { RenderEnum, RenderList } from "./DropDown";
import "./Radio.css";

type RadioValue = string;

interface RadioProps {
  title: string;
  value: RadioValue;
}

export function Radio(props: RadioProps) {
  return (
    <div className="radio">
      <div className="circle"></div>
      <div className="value">{props.title}</div>
    </div>
  );
}

export enum RadioStack {
  horizontal,
  vertical,
}

interface RadioGroupProps {
  title?: string;
  className?: string;
  children:
    | React.ReactElement<typeof Radio>[]
    | React.ReactElement<typeof RenderEnum>
    | React.ReactElement<typeof RenderList>;
  selected?: RadioValue;
  stack?: RadioStack;
  onSelect: (value: RadioValue) => void;
}

const filterEnumValues = (e: any) => {
  const values: any[] = Object.values(e);
  if (values.length % 2 !== 0) return values;
  if (
    isNaN(Number(values[values.length / 2 - 1])) &&
    !isNaN(Number(values[values.length - 1]))
  )
    return values.slice(0, values.length / 2);
  else return values;
};

export function RadioGroup(props: RadioGroupProps) {
  const [selected, setSelected] = useState(props.selected);
  let children: any[] = React.Children.toArray(props.children);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);
  if (children.length == 1) {
    let displayProperty = "";
    if (children[0].type.name == "RenderEnum") {
      children = filterEnumValues(children[0].props.enum);
    } else if (children[0].type.name == "RenderList") {
      let temp = children[0];
      children = Object.values(temp.props.items);
      displayProperty = temp.props.displayProperty;
    }
    children = children.map((key: any) => (
      <Radio value={key} title={displayProperty ? key[displayProperty] : key} />
    ));
  }

  return (
    <div className={`radio-group-container ${props.className || ""}`}>
      {props.title ? (
        <div className="radio-group-title">{props.title}</div>
      ) : (
        ""
      )}
      <div className="radio-group">
        {children.map((radio: any, index: number) => (
          
          <div
            key={index}
            onClick={() => {
              setSelected(radio.props.value);
              props.onSelect(radio.props.value);
            }}
            className={`radio-item ${
              radio.props.value === selected ? "selected" : ""
            }`}
          >
            {radio}
          </div>
        ))}
      </div>
    </div>
  );
}
