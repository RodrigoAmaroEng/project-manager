import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, SpaceFill, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addTerminator,
  goToStep,
  removeTerminator,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import { ReactComponent as TerminatorIcon } from "../../../img/terminator-icon.svg";
import { ReactComponent as AddIcon } from "../../../img/add-icon.svg";
import { ReactComponent as RemoveIcon } from "../../../img/remove-icon.svg";


import StaticField from "../../../components/StaticField";
import WizardNavigationControl from "../WizardNavigationControl";

export default function TerminatorsPage(props: any) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
  const error = useSelector((state: any) => state.operation.error);

  const add = () => {
    dispatch(addTerminator(name));
    setName("");
  };
  const remove = (e: any) => dispatch(removeTerminator(e));
  const nextAction = () => goToStep(2);

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 1 - Terminators</h1>
      <Line>
        <Field value={name} placeholder="Terminator name" onChange={setName} />
        <SpaceFill />
        <Button type={ButtonType.main} onClick={add} className="square">
          <AddIcon/>
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first terminator to see it here</IfEmpty>
        <Action>
          <Button type={ButtonType.main} onClick={remove} className="square">
            <RemoveIcon/>
          </Button>
        </Action>
        {terminators.map((terminator: any) => (
          <Row item={terminator}>
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
