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
  addOperation,
  addTerminator,
  goToStep,
  removeTerminator,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import ErrorBox from "../../../components/ErrorBox";
import { dismissError } from "../../../App.actions";
import { Radio, RadioGroup } from "../../../components/Radio";
import DropDown, { Option } from "../../../components/DropDown";

export default function OperationsPage(props: any) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [terminatorRef, setTerminatorRef] = useState(undefined);
  const [direction, setDirection] = useState(undefined);
  const operations = useSelector(
    (state: any) => state.project.content.operations
  );
  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
  const error = useSelector((state: any) => state.operation.error);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h1>Step 2 - Operations</h1>
      <Line>
        <Field
          value={name}
          placeholder="Operation name"
          onChange={(value: string) => setName(value)}
        />
        <SpaceH />
        <DropDown onSelect={(item: any) => setTerminatorRef(item)} className="fill-space">
          {terminators.map((item:any)=> <Option item={item}><h6>{item}</h6></Option>)}
        </DropDown>
        <SpaceH />
        <RadioGroup onSelect={(item: any) => setDirection(item)}>
          <Radio title="Input" value="IN" />
          <Radio title="Output" value="OUT" />
        </RadioGroup>
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            dispatch(addOperation(name, terminatorRef, direction));
            setName("");
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.SingleSelect} className="fill-space">
        <IfEmpty>Add your first operation to see it here</IfEmpty>
        <Action>
          <Button
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removeTerminator(e))}
          >
            -
          </Button>
        </Action>
        {operations.map((item: any) => (
          <Row item={item}>
            <Circle>T</Circle>
            <SpaceH />
            <h6>{item}</h6>
          </Row>
        ))}
      </List>
      <SpaceV />
      <Line align={LineAlignment.right}>
        <ErrorBox visible={!!error} onDismiss={() => dispatch(dismissError())}>
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
