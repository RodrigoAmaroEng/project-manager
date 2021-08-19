import { useEffect, useState } from "react";
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
  children: React.ReactElement<typeof Radio>[];
  selected?: RadioValue;
  stack?: RadioStack;
  onSelect: (value: RadioValue) => void;
}

export function RadioGroup(props: RadioGroupProps) {
  const [selected, setSelected] = useState(props.selected);
  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);
  return (
    <div className="radio-group">
      {props.children.map((radio: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            setSelected(radio.props.value);
            props.onSelect(radio.props.value);
          }}
          className={`radio-item ${
            radio.props.value == selected ? "selected" : ""
          }`}
        >
          {radio}
        </div>
      ))}
    </div>
  );
}
