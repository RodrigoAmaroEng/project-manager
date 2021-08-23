import {  useState } from "react";
import { useForceUpdate } from "../../extras/extension-functions";
import { FieldType, Terminator } from "../../extras/models";
import Button, { ButtonType } from "../Button";
import Field from "../Field";
import { Line, SpaceFill, SpaceH, SpaceV } from "../Utils";

function FieldRenderer(props: any) {
  if (props.type === FieldType.input) {
    return (
      <Field
        value={props.value}
        onChange={props.onChange}
        className={props.size}
      />
    );
  } else if (props.type === FieldType.smartInput) {
    return <Field value={props.value} onChange={props.onChange} />;
  }
  return <br />;
}

export default function RegistryForm(props: any) {
  const [item, setItem] = useState(props.item);
  const forceUpdate = useForceUpdate();
  const setValueFor = (key: string, value: any) => {
    let target = item || {};
    target[key] = value;
    setItem(target);
    forceUpdate();
  };
  return (
    <div className="form-registry">
      <h1>{item ? `Editing '${item.name}'` : `New ${props.object.name}`} </h1>
      {Object.entries(props.object._definitions)
        .filter(([key, value]: any) => value.type !== FieldType.identifier)
        .map(([key, value]: any) => (
          <div className="flex-col">
            <FieldRenderer
              {...value}
              value={item ? item[key] : ""}
              onChange={(v: any) => setValueFor(key, v)}
            />
            <SpaceV />
          </div>
        ))}
      <SpaceFill />
      <Line className="line-align-right">
        <Button
          type={ButtonType.secondary}
          onClick={props.onCancel}
          className="one-twenty"
        >
          Cancel
        </Button>
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => props.onSave(item)}
          className="one-twenty"
        >
          Save
        </Button>
      </Line>
    </div>
  );
}
