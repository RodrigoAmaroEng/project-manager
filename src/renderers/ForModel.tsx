import Circle from "../components/Circle";
import StaticField from "../components/StaticField";
import { Line, SpaceH } from "../components/Utils";
import { Entity, Property } from "../extras/Entity.model";
import { RecordList } from "../extras/extension-functions";
import { PropertyType } from "../extras/models";
import { Operation } from "../extras/Operation.model";
import { Payload, PayloadProperty } from "../extras/Payload.model";
import { Terminator } from "../extras/Terminator.model";
import { EntityIcon, VariableIcon } from "../img/Icons";

function forTerminator(item: any) {
  return <StaticField label="Name" value={item.name} className="fill-space" />;
}
function forEntity(item: any) {
  return <StaticField label="Name" value={item.name} className="fill-space" />
}

function forPayload(item: any) {
  return <StaticField label="Name" value={item.name} className="fill-space" />
}

function forOperation(item: any) {
  return <StaticField label="Name" value={item.name} className="fill-space" />
}

function forPayloadProperty(item: any, stores: any) {
  if (item.kind === PropertyType.EntityProperty) {
    let entity = RecordList.fromList(stores.entities).byId(item.entityId);
    return (
      <Line className="fill-space">
        <Circle>
          <EntityIcon />
        </Circle>
        <SpaceH />
        <StaticField label="Entity" value={entity.name} className="half" />
        <StaticField
          label="Property"
          value={
            RecordList.fromList(entity.properties).byId(item.propertyId).name
          }
          className="half"
        />
      </Line>
    );
  } else if (item.kind === PropertyType.Variable) {
    return (
      <Line className="fill-space">
        <Circle>
          <VariableIcon />
        </Circle>
        <SpaceH />
        <StaticField label="Name" value={item.name} className="half" />
        <StaticField label="Type" value={item.type} className="half" />
      </Line>
    );
  }
}
function forProperty(item: any) {
  return (
    <Line className="fill-space">
      <StaticField label="Name" value={item.name} className="half" />
      <StaticField label="Type" value={item.type} className="half" />
    </Line>
  );
}

export function forModel(type: any, item: any, stores: any) {
  if (type === Terminator || type === "terminators") return forTerminator(item);
  if (type === Entity || type === "entities") return forEntity(item);
  if (type === Payload || type === "payloads") return forPayload(item);
  if (type === Operation || type === "opeartions") return forOperation(item);
  if (type === PayloadProperty) return forPayloadProperty(item, stores);
  if (type === Property) return forProperty(item);
}
