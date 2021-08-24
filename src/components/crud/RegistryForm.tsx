import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  buildErrorMessage,
  includeSimpleRegistry,
  removeFromList,
} from "../../extras/crud-operations";
import { RecordList, useForceUpdate } from "../../extras/extension-functions";
import { FieldType, SourceType } from "../../extras/models";
import { RemoveIcon } from "../../img/Icons";
import Button, { ButtonType, SquareMainButton } from "../Button";
import DropDown, { RenderEnum, RenderList } from "../DropDown";
import Field from "../Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../List";
import { RadioGroup } from "../Radio";
import { Line, SpaceFill, SpaceH, SpaceV } from "../Utils";

function SubForm(props: any) {
  const onSelectionChange = (items: any[]) => {
    if (items.length > 0) props.onListSelect(items[0].item.props.item);
    else props.onListSelect(undefined);
  };
  return (
    <Line className="fill-space">
      <div className="flex-col half flex-align-top">
        <RegistryForm
          object={props.kind}
          forList={true}
          onSave={props.onAdd}
          item={props.item}
        />
      </div>
      <SpaceH />
      <SpaceH />
      <div className="flex-col half stretch">
        <SpaceV />
        <SpaceV />
        <SpaceV />
        <SpaceV />
        <List
          listStyle={ListStyle.SingleSelect}
          className="fill-space"
          onSelectionChange={onSelectionChange}
        >
          <IfEmpty>No {props.name} registered</IfEmpty>
          <Action>
            <SquareMainButton onClick={props.onRemove}>
              <RemoveIcon />
            </SquareMainButton>
          </Action>
          {props.list.map((p: any, index: number) => (
            <Row item={p} key={`row-${index}`}>
              {props.renderer(props.kind, p, props.content)}
            </Row>
          ))}
        </List>
      </div>
    </Line>
  );
}

function FieldRenderer(props: any) {
  const content = useSelector((state: any) => state.project.content);
  const [item, setItem] = useState(undefined as any);
  const onChange = (value: any) => {
    props.onChange(value);
  };

  if (props.type === FieldType.input) {
    return (
      <Field
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        className={props.size}
      />
    );
  } else if (props.type === FieldType.smartInput) {
    return (
      <Field
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        className={props.size}
      />
    );
  } else if (props.type === FieldType.radio) {
    return (
      <RadioGroup
        title={props.placeholder}
        onSelect={onChange}
        className={props.size}
        selected={props.value}
      >
        <RenderEnum enum={props.source} />
      </RadioGroup>
    );
  } else if (props.type === FieldType.dropdown) {
    let items = [] as any;
    let onRender = {};

    if (props.sourceType === SourceType.list) {
      if (props.dependsOn) {
        let parts = props.object._meta.storeName.split(".");
        let id = Number(props.item?.[props.dependsOn]?.id);
        if (!isNaN(id)) {
          const store = RecordList.fromList(content[parts[0]]);
          console.log(store.byId(id));
          items = store.byId(id)[parts[1]];
          onRender = { onRender: (item: any) => item.name };
        }
      } else {
        items = content[props.source._meta.storeName];
        onRender = { onRender: (item: any) => item.name };
      }
    }
    return (
      <DropDown
        placeholder={props.placeholder}
        onSelect={onChange}
        className={props.size}
        selected={props.value}
        {...onRender}
      >
        {props.sourceType === SourceType.list ? (
          <RenderList items={items} displayProperty="name" />
        ) : (
          <RenderEnum enum={props.source} />
        )}
      </DropDown>
    );
  } else if (props.type === FieldType.list) {
    let list = props.value || [];
    const onAdd = (item: any) => {
      try {
        if (props.transform) {
          item = props.transform(item)
        }
        list = includeSimpleRegistry(list, item, props.kind._meta.validation);
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
      <SubForm
        kind={props.kind}
        onAdd={onAdd}
        onRemove={onRemove}
        list={list}
        item={item}
        renderer={props.renderer}
        name={props.kind.name}
        onListSelect={setItem}
        render={props.render}
        content={content}
      />
    );
  }
  return <b />;
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
  const fields = Object.entries(props.object._meta.fields)
    .filter(([key, value]: any) => value.type !== FieldType.identifier)
    .filter(
      ([key, value]: any) =>
        !value.conditionField ||
        item?.[value.conditionField] === value.condition
    );
  return (
    <div className="form-registry">
      {renderTitle(forList, props.object.name, item)}
      {fields.map(([key, value]: any, index: number) => (
        <div
          key={`field-${index}`}
          className={`flex-col${
            value.type === FieldType.list ? " fill-space" : ""
          }`}
        >
          <FieldRenderer
            name={key}
            {...value}
            object={props.object}
            item={item}
            value={item ? item[key] : ""}
            renderer={props.renderer}
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
function renderTitle(forList: boolean, objectName: string, item: any) {
  return forList ? (
    <h4>{objectName} list</h4>
  ) : (
    <h1>{item?.id ? `Editing '${item.name}'` : `New ${objectName}`} </h1>
  );
}
