import { useEffect, useState } from "react";
import DropDown, { Option } from "../../../components/DropDown";
import Field from "../../../components/Field";
import { Line, SpaceH } from "../../../components/Utils";
import { DataTypes } from "../../../extras/models";

export function NewVariableForm(props: any) {
  const [value, setValue] = useState(undefined as any);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <Line className="fill-space">
      <Field
        value={value?.name}
        placeholder="Variable name"
        onChange={(name: string) => {
          props.onChange(Object.assign(value || {}, { name }));
        }}
        className="half" />
      <SpaceH />
      <DropDown
        onSelect={(type: any) => props.onChange(Object.assign(value || {}, { type }))}
        placeholder="Variable type"
        selected={value?.type}
        className="half"
      >
        {Object.values(DataTypes).map((key) => (
          <Option item={key}>
            <h6>{key}</h6>
          </Option>
        ))}
      </DropDown>
    </Line>
  );
}
