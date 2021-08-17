import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonType } from "../../../components/Button";
import DropDown, { Option } from "../../../components/DropDown";
import Field from "../../../components/Field";
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
        <Option item="String">
          <h6>String</h6>
        </Option>
        <Option item="Boolean">
          <h6>Boolean</h6>
        </Option>
        <Option item="Number">
          <h6>Number</h6>
        </Option>
        <Option item="Date">
          <h6>Date</h6>
        </Option>
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
          <Option item="ENTITY">
            <h6>Entity property</h6>
          </Option>
          <Option item="VARIABLE">
            <h6>Variable</h6>
          </Option>
        </DropDown>
        <SpaceH />
        {kind === "ENTITY" ? (
          <EntityPropertyForm
            onChange={(data: any) => {
              setEntity(data.entity);
              setProperty(data.property);
            }}
            value={{ entity, property }}
          />
        ) : kind === "VARIABLE" ? (
          <NewVariableForm
            onChange={(data: any) => {
              setName(data.name);
              setType(data.type);
            }}
            value={{ name, type }}
          />
        ) : (
          ""
        )}
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            if (kind === "ENTITY")
              dispatch(addPayloadEntityProperty(id, entity, property));
            else if (kind === "VARIABLE")
              dispatch(addPayloadNewProperty(id, name, type));
            // setKind(undefined);
            // setName(undefined);
            // setType(undefined);
            // setEntity(undefined);
            // setProperty(undefined);
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
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removePayloadProperty(e, id))}
          >
            -
          </Button>
        </Action>
        {properties.map((item: any) => (
          <Row item={item}>
            <Circle>T</Circle>
            <SpaceH />
            <h6 className="one-tenth">{item.kind}</h6>
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
                  value={
                    item.type
                  }
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
