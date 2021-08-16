import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissError } from "../../../App.actions";
import Button, { ButtonType } from "../../../components/Button";
import ErrorBox from "../../../components/ErrorBox";
import Field from "../../../components/Field";
import {
  Line,
  LineAlignment,
  SpaceFill,
  SpaceH,
  SpaceV,
} from "../../../components/Utils";
import { RecordList } from "../../../extras/extension-functions";
import { goToStep, saveOperationDetail } from "../new-project.actions";

export default function OperationDetailsPage(props: any) {
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const error = useSelector((state: any) => state.operation.error);
  const dispatch = useDispatch();

  let id = parseInt(props.match.params.id);
  const operations = useSelector((state: any) =>
    RecordList.fromList(state.project.content.operations)
  );
  return (
    <div className="fill-space flex-col">
      <h1>Step 3 - "{operations.byId(id).name}" details</h1>
      <Field
        value={description}
        placeholder="Operation description"
        onChange={(value: string) => setDescription(value)}
      />
      <SpaceV />
      <Field
        value={trigger}
        placeholder="Trigger"
        onChange={(value: string) => setTrigger(value)}
      />
      <SpaceV />
      <Field
        value={input}
        placeholder="Input payload"
        onChange={(value: string) => setInput(value)}
      />
      <SpaceV />
      <Field
        value={output}
        placeholder="Output payload"
        onChange={(value: string) => setOutput(value)}
      />
      <SpaceFill />
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
          onClick={() =>
            dispatch(
              saveOperationDetail(id, { description, trigger, input, output })
            )
          }
        >
          Next
        </Button>
      </Line>
    </div>
  );
}
