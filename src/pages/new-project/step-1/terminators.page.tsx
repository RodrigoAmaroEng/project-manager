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
  addTerminator,
  goToStep,
  removeTerminator,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import ErrorBox from "../../../components/ErrorBox";
import { dismissError } from "../../../App.actions";
import { ReactComponent as TerminatorIcon } from "../../../img/terminator-icon.svg";
import StaticField from "../../../components/StaticField";

export default function TerminatorsPage(props: any) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
  const error = useSelector((state: any) => state.operation.error);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 1 - Terminators</h1>
      <Line>
        <Field
          value={name}
          placeholder="Terminator name"
          onChange={(value: string) => setName(value)}
        />
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            dispatch(addTerminator(name));
            setName("");
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first terminator to see it here</IfEmpty>
        <Action>
          <Button
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removeTerminator(e))}
          >
            -
          </Button>
        </Action>
        {terminators.map((terminator: any) => (
          <Row item={terminator}>
            <Circle><TerminatorIcon/></Circle>
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
      <Line align={LineAlignment.right}>
        <ErrorBox visible={!!error} className="fill-space" onDismiss={() => dispatch(dismissError())}>
          {error}
        </ErrorBox>
        <SpaceH />
        <Button type={ButtonType.secondary} onClick={() => {}}>
          Skip
        </Button>
        <SpaceH />
        <Button type={ButtonType.main} onClick={() => dispatch(goToStep(2))}>
          Next
        </Button>
      </Line>
    </div>
  );
}
