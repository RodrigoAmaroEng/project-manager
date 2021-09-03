import { SquareMainButton } from "../../components/Button";
import Field from "../../components/Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../../components/List";
import { Line, SpaceFill, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { goToEntityProperties } from "./new-project.actions";
import { useEffect, useState } from "react";
import Circle from "../../components/Circle";
import StaticField from "../../components/StaticField";
import WizardNavigationControl from "./WizardNavigationControl";
import { fieldsClear } from "../../App.actions";
import { AddIcon, EntityIcon, RemoveIcon } from "../../img/Icons";
import { addEntity, removeEntity } from "../../base/entity/Entity.actions";

export default function Step4Page(props: any) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const entities = useSelector((state: any) => state.project.content.entities);
  const error = useSelector((state: any) => state.operation.error);
  const shouldClearFields = useSelector(
    (state: any) => state.operation.clearFields
  );

  useEffect(() => {
    if (shouldClearFields) {
      setName("");
      dispatch(fieldsClear());
    }
  }, [shouldClearFields]);

  const add = () => dispatch(addEntity(name));
  const remove = (e: any) => dispatch(removeEntity(e));
  const nextAction = () => dispatch(goToEntityProperties());

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Entities</h1>
      <Line className="flex-align-bottom">
        <Field value={name} placeholder="Entity name" onChange={setName} />
        <SpaceFill />
        <SquareMainButton onClick={add}>
          <AddIcon />
        </SquareMainButton>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first entity to see it here</IfEmpty>
        <Action>
          <SquareMainButton onClick={remove}>
            <RemoveIcon />
          </SquareMainButton>
        </Action>
        {entities.map((entity: any, index: number) => (
          <Row item={entity} key={index}>
            <Circle>
              <EntityIcon />
            </Circle>
            <SpaceH />
            <StaticField
              className="fill-space"
              label="Entity name"
              value={entity.name}
            />
          </Row>
        ))}
      </List>
      <SpaceV />
      <WizardNavigationControl error={error} nextAction={nextAction} />
    </div>
  );
}
