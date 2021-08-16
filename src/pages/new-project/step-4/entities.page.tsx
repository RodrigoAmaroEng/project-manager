import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, LineAlignment, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntity,
  goToEntityProperties,
  goToStep,
  removeEntity,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import ErrorBox from "../../../components/ErrorBox";
import { dismissError } from "../../../App.actions";

export default function EntitiesPage(props: any) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const entities = useSelector(
    (state: any) => state.project.content.entities
  );
  const error = useSelector((state: any) => state.operation.error);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 4 - Entities</h1>
      <Line>
        <Field
          value={name}
          placeholder="Entity name"
          onChange={(value: string) => setName(value)}
        />
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            dispatch(addEntity(name));
            setName("");
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first entity to see it here</IfEmpty>
        <Action>
          <Button
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removeEntity(e))}
          >
            -
          </Button>
        </Action>
        {entities.map((entity: any) => (
          <Row item={entity}>
            <Circle>T</Circle>
            <SpaceH />
            <h6>{entity.name}</h6>
          </Row>
        ))}
      </List>
      <SpaceV />
      <Line align={LineAlignment.right}>
        <ErrorBox visible={!!error} className="fill-space" onDismiss={() => dispatch(dismissError())}>
          {error}
        </ErrorBox>
        <SpaceH />
        <Button type={ButtonType.secondary} onClick={() => {}}>
          Skip
        </Button>
        <SpaceH />
        <Button type={ButtonType.main} onClick={() => dispatch(goToEntityProperties())}>
          Next
        </Button>
      </Line>
    </div>
  );
}
