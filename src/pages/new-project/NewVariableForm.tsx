import { useEffect, useState } from "react";
import DropDown, { RenderEnum } from "../../components/DropDown";
import Field from "../../components/Field";
import { Line, SpaceH } from "../../components/Utils";
import { DataTypes } from "../../extras/models";

export function NewVariableForm(props: any) {
  const [value, setValue] = useState(undefined as any);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChangeName = (name: string) => {
    props.onChange(Object.assign(value || {}, { name }));
  };
  const onSelectType = (type: any) =>
    props.onChange(Object.assign(value || {}, { type }));

  return (
    <Line className="fill-space">
      <Field
        value={value?.name}
        placeholder="Variable name"
        onChange={onChangeName}
        className="half"
      />
      <SpaceH />
      <DropDown
        onSelect={onSelectType}
        placeholder="Variable type"
        selected={value?.type}
        className="half"
      >
        <RenderEnum enum={DataTypes} />
      </DropDown>
    </Line>
  );
}
