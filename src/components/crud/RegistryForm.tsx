import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  buildErrorMessage,
  includeSimpleRegistry,
  removeFromList,
} from "../../extras/crud-operations";
import { useForceUpdate } from "../../extras/extension-functions";
import { FieldType, Property, SourceType } from "../../extras/models";
import { RemoveIcon } from "../../img/Icons";
import Button, { ButtonType } from "../Button";
import DropDown, { RenderEnum, RenderList } from "../DropDown";
import Field from "../Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../List";
import { RadioGroup } from "../Radio";
import { Line, SpaceFill, SpaceH, SpaceV } from "../Utils";


function FieldRenderer(props: any) {
  const content = useSelector((state: any) => state.project.content);
  const [item, setItem] = useState(undefined as any);
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
        {props.sourceType === SourceType.list ? (
          <RenderList
            items={content[props.source.name.toLowerCase() + "s"]}
            displayProperty="name"
          />
        ) : (
          <RenderEnum enum={props.source} />
        )}
      </DropDown>
    );
  } else if (props.type === FieldType.list) {
    let list = props.value || [];

    const onAdd = (item: any) => {
      try {
        list = includeSimpleRegistry(list, item);
      } catch (e) {
        let error = buildErrorMessage(
          e,
          item.name,
          `${props.object.name} ${props.kind.name}`
        );
      }
      props.onChange(list);
    };
    const onRemove = (item: any) => {
      list = removeFromList(list, item);
      props.onChange(list);
    };
    return (
      <Line className="fill-space">
        <div className="flex-col half flex-align-top">
          <RegistryForm
            object={Property}
            forList={true}
            onSave={onAdd}
            item={item}
          />
        </div>
        <SpaceH />
        <SpaceH />
        <div className="flex-col half stretch">
          <List
            listStyle={ListStyle.SingleSelect}
            className="fill-space"
            onSelectionChange={(items: any[]) => {
              if (items.length > 0) setItem(items[0].item.props.item);
              else setItem(undefined);
            }}
          >
            <IfEmpty>No {props.kind.name} registered</IfEmpty>
            <Action>
              <Button
                type={ButtonType.main}
                onClick={onRemove}
                className="square"
              >
                <RemoveIcon />
              </Button>
            </Action>
            {list.map((p: any) => (
              <Row item={p}>
                <h6>{p.name}</h6>
              </Row>
            ))}
          </List>
        </div>
      </Line>
    );
  }
  return <br />;
}

export default function RegistryForm(props: any) {
  const [item, setItem] = useState(props.item);
  const forceUpdate = useForceUpdate();
  const forList = !!props.forList;
  const setValueFor = (key: string, value: any) => {
    let target = item || {};
    target[key] = value;
    setItem(target);
    forceUpdate();
  };
  useEffect(() => {
    setItem(props.item);
  }, [props.item]);
  const title = forList ? (
    <h4>{props.object.name} list</h4>
  ) : (
    <h1>
      {item && item.id ? `Editing '${item.name}'` : `New ${props.object.name}`}{" "}
    </h1>
  );
  const fields = Object.entries(props.object._definitions).filter(
    ([key, value]: any) => value.type !== FieldType.identifier
  );
  return (
    <div className="form-registry">
      {title}
      {fields.map(([key, value]: any, index: number) => (
        <div
          className={`flex-col${
            index == fields.length - 1 ? " fill-space" : ""
          }`}
        >
          <FieldRenderer
            {...value}
            object={props.object}
            value={item ? item[key] : ""}
            onChange={(v: any) => setValueFor(key, v)}
          />
          <SpaceV />
        </div>
      ))}
      <SpaceFill />
      {forList ? (
        <Line className="line-align-right">
          <Button
            type={ButtonType.main}
            onClick={() => {
              props.onSave(item);
              setItem(undefined);
            }}
            className="one-twenty"
          >
            {item && item.id ? "Update" : "Add"}
          </Button>
        </Line>
      ) : (
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
      )}
    </div>
  );
}
