import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonType } from "../../../components/Button";
import DropDown, { Option } from "../../../components/DropDown";
import Field from "../../../components/Field";
import { ReactComponent as EntityIcon } from "../../../img/entity-icon.svg";
import { ReactComponent as VariableIcon } from "../../../img/informacion.svg";

import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, SpaceH, SpaceV } from "../../../components/Utils";
import { RecordList } from "../../../extras/extension-functions";
import {
  addPayloadEntityProperty,
  addPayloadNewProperty,
  removePayloadProperty,
} from "../new-project.actions";
import Circle from "../../../components/Circle";
import StaticField from "../../../components/StaticField";
import { DataTypes, PropertyType } from "../../../extras/models";

function NewVariableForm(props: any) {
  const [value, setValue] = useState(undefined as any);
  useEffect(() => {
    console.log(props.value);
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
        className="half"
      />
      <SpaceH />
      <DropDown
        onSelect={(type: any) =>
          props.onChange(Object.assign(value || {}, { type }))
        }
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

function EntityPropertyForm(props: any) {
  const entities = useSelector((state: any) =>
    RecordList.fromList(state.project.content.entities)
  );

  const properties = RecordList.fromList(props.value?.entity?.properties || []);

  return (
    <Line className="fill-space">
      <DropDown
        onSelect={(item: any) =>
          props.onChange(Object.assign(props.value || {}, { entity: item }))
        }
        onRender={(item: any) => item.name}
        placeholder="Entity"
        selected={props.value?.entity}
        className="half"
      >
        {entities.map((it: any) => (
          <Option item={it}>
            <h6>{it.name}</h6>
          </Option>
        ))}
      </DropDown>
      <SpaceH />
      <DropDown
        onSelect={(item: any) =>
          props.onChange(Object.assign(props.value || {}, { property: item }))
        }
        selected={props.value?.property}
        placeholder="Property"
        onRender={(item: any) => item.name}
        className="half"
      >
        {properties.map((it: any) => (
          <Option item={it}>
            <h6>{it.name}</h6>
          </Option>
        ))}
      </DropDown>
    </Line>
  );
}

export default function PayloadsPage(props: any) {
  const dispatch = useDispatch();
  let id = parseInt(props.match.params.id);
  const [data, setData] = useState(undefined as any);
  const [name, setName] = useState(undefined as any);
  const [type, setType] = useState(undefined as any);
  const [entity, setEntity] = useState(undefined as any);
  const [property, setProperty] = useState(undefined as any);
  const [kind, setKind] = useState(undefined);
  const payloads = useSelector((state: any) =>
    RecordList.fromList(state.project.content.payloads)
  );

  const entities = useSelector((state: any) =>
    RecordList.fromList(state.project.content.entities)
  );
  const thisPayload = payloads.byId(id);

  const properties = thisPayload.properties || [];
  return (
    <div className="fill-space flex-col">
      <h1>Step 6 - "{thisPayload.name}" properties</h1>
      <Line>
        <DropDown
          onSelect={(item: any) => {
            setKind(item);
            setName(undefined);
            setType(undefined);
            setEntity(undefined);
            setProperty(undefined);
          }}
          selected={kind}
          className="one-fourth"
        >
          {Object.values(PropertyType).map((key) => (
            <Option item={key}>
              <h6>{key}</h6>
            </Option>
          ))}
        </DropDown>
        <SpaceH />
        {kind === PropertyType.EntityProperty ? (
          <EntityPropertyForm
            onChange={(data: any) => {
              setEntity(data.entity);
              setProperty(data.property);
            }}
            value={{ entity, property }}
          />
        ) : kind === PropertyType.Variable ? (
          <NewVariableForm
            onChange={(data: any) => {
              setName(data.name);
              setType(data.type);
            }}
            value={{ name, type }}
          />
        ) : (
          <Line className="fill-space"></Line>
        )}
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            if (kind === PropertyType.EntityProperty)
              dispatch(addPayloadEntityProperty(id, entity, property));
            else if (kind === PropertyType.Variable)
              dispatch(addPayloadNewProperty(id, name, type));
            setKind(undefined);
            setName(undefined);
            setType(undefined);
            setEntity(undefined);
            setProperty(undefined);
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first payload property to see it here</IfEmpty>
        <Action>
          <Button
            className="square"
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removePayloadProperty(e, id))}
          >
            -
          </Button>
        </Action>
        {properties.map((item: any) => (
          <Row item={item}>
            <Circle>
              {item.kind === "entity" ? <EntityIcon /> : <VariableIcon />}
            </Circle>
            <SpaceH />
            {item.kind === "entity" ? (
              <Line className="fill-space">
                <StaticField
                  className="half"
                  label="Entity name"
                  value={entities.byId(item.entityId).name}
                />
                <SpaceH />
                <StaticField
                  className="half"
                  label="Property name"
                  value={
                    RecordList.fromList(
                      entities.byId(item.entityId).properties
                    ).byId(item.propertyId).name
                  }
                />
              </Line>
            ) : (
              <Line className="fill-space">
                <StaticField
                  className="half"
                  label="Variable name"
                  value={item.name}
                />
                <SpaceH />
                <StaticField
                  className="half"
                  label="Variable type"
                  value={item.type}
                />
              </Line>
            )}
            <SpaceH />
          </Row>
        ))}
      </List>
    </div>
  );
}
