import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, LineAlignment, SpaceFill, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as OperationIcon } from "../../../img/operation-icon.svg";

import {
  addOperation,
  goToOperationDetails,
  goToStep,
  removeOperation,
  removeTerminator,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import ErrorBox from "../../../components/ErrorBox";
import { dismissError } from "../../../App.actions";
import { Radio, RadioGroup } from "../../../components/Radio";
import DropDown, { Option } from "../../../components/DropDown";
import { RecordList } from "../../../extras/extension-functions";
import StaticField from "../../../components/StaticField";

export default function OperationsPage(props: any) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [terminatorRef, setTerminatorRef] = useState(undefined);
  const [direction, setDirection] = useState(undefined);
  const operations = useSelector((state: any) =>
    RecordList.fromList(state.project.content.operations)
  );
  const terminators = useSelector((state: any) =>
    RecordList.fromList(state.project.content.terminators)
  );
  const error = useSelector((state: any) => state.operation.error);
  return (
    <div className="fill-space flex-col">
      <h1>Step 2 - Operations</h1>
      <Line>
        <Field
          value={name}
          placeholder="Operation name"
          className="one-third"
          onChange={(value: string) => setName(value)}
        />
        <SpaceH />
        <DropDown
          onSelect={(item: any) => setTerminatorRef(item)}
          onRender={(item: any) => item.name}
          selected={terminatorRef}
          className="one-third"
        >
          {terminators.map((item: any) => (
            <Option item={item}>
              <h6>{item.name}</h6>
            </Option>
          ))}
        </DropDown>
        <SpaceH />
        <RadioGroup
          onSelect={(item: any) => setDirection(item)}
          selected={direction}
        >
          <Radio title="Input" value="IN" />
          <Radio title="Output" value="OUT" />
        </RadioGroup>
        <SpaceH />
        <SpaceFill/>
        <Button
          type={ButtonType.main}
          onClick={() => {
            dispatch(addOperation(name, terminatorRef, direction));
            setName("");
            setTerminatorRef(undefined);
            setDirection(undefined);
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first operation to see it here</IfEmpty>
        <Action>
          <Button
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removeOperation(e))}
          >
            -
          </Button>
        </Action>
        {operations.map((item: any) => (
          <Row item={item}>
            <Circle>
              <OperationIcon />
            </Circle>
            <SpaceH />
            <StaticField
              className="fill-space"
              label="Operation name"
              value={item.name}
            />
            <SpaceH />
            <StaticField
              className="one-fourth"
              label="Terminator starter/destiny"
              value={terminators.byId(item.terminator).name}
            />
            
            <SpaceH />
            <StaticField
              className="one-twenty"
              label="Direction"
              value={item.direction}
            />
            <SpaceH />
            <SpaceH />
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
        <Button
          type={ButtonType.main}
          onClick={() => dispatch(goToOperationDetails())}
        >
          Next
        </Button>
      </Line>
    </div>
  );
}
