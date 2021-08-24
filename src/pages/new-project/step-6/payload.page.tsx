import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonType } from "../../../components/Button";
import DropDown, { RenderEnum } from "../../../components/DropDown";
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
import { PropertyType } from "../../../extras/models";
import WizardNavigationControl from "../WizardNavigationControl";
import { EntityPropertyForm } from "./EntityPropertyForm";
import { NewVariableForm } from "./NewVariableForm";
import { GDriveApiInstance } from "../../../extras/gdrive-api";
import { saveAndFinishWizard } from "../new-project.reducer";
import { fieldsClear } from "../../../App.actions";
import { AddIcon, EntityIcon, RemoveIcon, VariableIcon } from "../../../img/Icons";

export default function PayloadsPage(props: any) {
  // INITIALIZERS
  const dispatch = useDispatch();
  let id = parseInt(props.match.params.id);

  // STATES
  const [name, setName] = useState(undefined as any);
  const [type, setType] = useState(undefined as any);
  const [entity, setEntity] = useState(undefined as any);
  const [property, setProperty] = useState(undefined as any);
  const [kind, setKind] = useState(undefined);

  // SELECTORS
  const payloads = useSelector((state: any) =>
    RecordList.fromList(state.project.content.payloads)
  );
  const entities = useSelector((state: any) =>
    RecordList.fromList(state.project.content.entities)
  );
  const thisPayload = payloads.byId(id);
  const error = useSelector((state: any) => state.operation.error);
  const properties = thisPayload.properties || [];
  const shouldClearFields = useSelector(
    (state: any) => state.operation.clearFields
  );
  useEffect(() => {
    if (shouldClearFields) {
      setKind(undefined);
      setName(undefined);
      setType(undefined);
      setEntity(undefined);
      setProperty(undefined);
      dispatch(fieldsClear());
    }
  }, [shouldClearFields]);

  // CALLBACKS
  const onSelect = (item: any) => {
    setKind(item);
    setName(undefined);
    setType(undefined);
    setEntity(undefined);
    setProperty(undefined);
  };
  const onChangeEntity = (data: any) => {
    setEntity(data.entity);
    setProperty(data.property);
  };
  const onChangeVariable = (data: any) => {
    setName(data.name);
    setType(data.type);
  };
  const add = () => {
    if (kind === PropertyType.EntityProperty)
      dispatch(addPayloadEntityProperty(id, entity, property));
    else if (kind === PropertyType.Variable)
      dispatch(addPayloadNewProperty(id, name, type));
  };
  const remove = (e: any) => dispatch(removePayloadProperty(e, id));
  const nextAction = () => saveAndFinishWizard(GDriveApiInstance.upload);

  // SLICES
  const form =
    kind === PropertyType.EntityProperty ? (
      <EntityPropertyForm
        onChange={onChangeEntity}
        value={{ entity, property }}
      />
    ) : kind === PropertyType.Variable ? (
      <NewVariableForm onChange={onChangeVariable} value={{ name, type }} />
    ) : (
      <Line className="fill-space"></Line>
    );
  const rowDescription = (item: any) =>
    item.kind === PropertyType.EntityProperty ? (
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
            RecordList.fromList(entities.byId(item.entityId).properties).byId(
              item.propertyId
            ).name
          }
        />
      </Line>
    ) : (
      <Line className="fill-space">
        <StaticField className="half" label="Variable name" value={item.name} />
        <SpaceH />
        <StaticField className="half" label="Variable type" value={item.type} />
      </Line>
    );

  return (
    <div className="fill-space flex-col">
      <h1>Step 6 - "{thisPayload.name}" properties</h1>
      <Line>
        <DropDown onSelect={onSelect} selected={kind} className="one-fourth">
          <RenderEnum enum={PropertyType} />
        </DropDown>
        <SpaceH />
        {form}
        <SpaceH />
        <Button type={ButtonType.main} onClick={add} className="square">
          <AddIcon />
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first payload property to see it here</IfEmpty>
        <Action>
          <Button className="square" type={ButtonType.main} onClick={remove}>
            <RemoveIcon />
          </Button>
        </Action>
        {properties.map((item: any, index: number) => (
          <Row item={item} key={index}>
            <Circle>
              {item.kind === PropertyType.EntityProperty ? <EntityIcon /> : <VariableIcon />}
            </Circle>
            <SpaceH />
            {rowDescription(item)}
            <SpaceH />
          </Row>
        ))}
      </List>
      <SpaceV />
      <WizardNavigationControl error={error} nextAction={nextAction} />
    </div>
  );
}
