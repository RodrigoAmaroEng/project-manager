import { useState } from "react";
import "./Switcher.css";

export default function Switcher(props: any) {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked(!checked);
    if (props.onChange) props.onChange(checked)
  }
  return (
    <div className={`switcher${props.isChecked ? ' checked' : ""}`}>
      <div className="switcher-button" onClick={onChange}>
        <div className="switcher-dial"></div>
      </div>
      <div className="switcher-label">{props.label}</div>
    </div>
  );
}
