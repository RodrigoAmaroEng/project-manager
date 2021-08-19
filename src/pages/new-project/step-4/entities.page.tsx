import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntity,
  goToEntityProperties,
  removeEntity,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import { ReactComponent as EntityIcon } from "../../../img/entity-icon.svg";
import { ReactComponent as AddIcon } from "../../../img/add-icon.svg";
import { ReactComponent as RemoveIcon } from "../../../img/remove-icon.svg";
import StaticField from "../../../components/StaticField";
import WizardNavigationControl from "../WizardNavigationControl";
export default function EntitiesPage(props: any) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const entities = useSelector((state: any) => state.project.content.entities);
  const error = useSelector((state: any) => state.operation.error);

  const add = () => addEntity(name);
  const remove = (e: any) => dispatch(removeEntity(e));
  const nextAction = () => dispatch(goToEntityProperties());

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 4 - Entities</h1>
      <Line>
        <Field value={name} placeholder="Entity name" onChange={setName} />
        <SpaceH />
        <Button type={ButtonType.main} onClick={add} className="square">
          <AddIcon />
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first entity to see it here</IfEmpty>
        <Action>
          <Button type={ButtonType.main} onClick={remove} className="square">
            <RemoveIcon />
          </Button>
        </Action>
        {entities.map((entity: any) => (
          <Row item={entity}>
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
