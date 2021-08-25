import { SquareMainButton } from "../../components/Button";
import Field from "../../components/Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../../components/List";
import { Line, SpaceFill, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { finishTerminatorStep } from "./new-project.actions";
import { useState } from "react";
import Circle from "../../components/Circle";
import StaticField from "../../components/StaticField";
import WizardNavigationControl from "./WizardNavigationControl";
import { useEffect } from "react";
import { fieldsClear } from "../../App.actions";
import { AddIcon, RemoveIcon, TerminatorIcon } from "../../img/Icons";
import {
  addTerminator,
  removeTerminator,
} from "../../base/terminator/Terminator.actions";

export default function Step1Page(props: any) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
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

  const add = () => dispatch(addTerminator(name));
  const remove = (e: any) => dispatch(removeTerminator(e));
  const nextAction = () => finishTerminatorStep();

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 1 - Terminators</h1>
      <Line>
        <Field value={name} placeholder="Terminator name" onChange={setName} />
        <SpaceFill />
        <SquareMainButton onClick={add}>
          <AddIcon />
        </SquareMainButton>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first terminator to see it here</IfEmpty>
        <Action>
          <SquareMainButton onClick={remove}>
            <RemoveIcon />
          </SquareMainButton>
        </Action>
        {terminators.map((terminator: any, index: number) => (
          <Row item={terminator} key={index}>
            <Circle>
              <TerminatorIcon />
            </Circle>
            <SpaceH />
            <StaticField
              label="Terminator name"
              value={terminator.name}
              className="fill-space"
            />
          </Row>
        ))}
      </List>
      <SpaceV />
      <WizardNavigationControl error={error} nextAction={nextAction} />
    </div>
  );
}
