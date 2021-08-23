import { useState } from "react";
import { useSelector } from "react-redux";
import { useForceUpdate } from "../../extras/extension-functions";
import { FieldType } from "../../extras/models";
import Button, { ButtonType } from "../Button";
import DropDown, { RenderEnum, RenderList } from "../DropDown";
import Field from "../Field";
import { RadioGroup } from "../Radio";
import { Line, SpaceFill, SpaceH, SpaceV } from "../Utils";

function FieldRenderer(props: any) {
  const content = useSelector((state: any) => state.project.content);
  if (props.type === FieldType.input) {
    return (
      <Field
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.size}
      />
    );
  } else if (props.type === FieldType.smartInput) {
    return (
      <Field
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.size}
      />
    );
  } else if (props.type === FieldType.radio) {
    return (
      <RadioGroup
        title={props.placeholder}
        onSelect={props.onChange}
        className={props.size}
        selected={props.value}
      >
        <RenderEnum enum={props.source} />
      </RadioGroup>
    );
  } else if (props.type === FieldType.dropdown) {
    return (
      <DropDown
        placeholder={props.placeholder}
        onSelect={props.onChange}
        className={props.size}
        selected={props.value}
      >
        <RenderList
          items={content[props.source.name.toLowerCase() + "s"]}
          displayProperty="name"
        />
      </DropDown>
    );
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
