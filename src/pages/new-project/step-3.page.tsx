import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fieldsClear } from "../../App.actions";
import Field from "../../components/Field";
import { SpaceFill, SpaceV } from "../../components/Utils";
import { RecordList } from "../../extras/extension-functions";
import { saveOperationDetail } from "./new-project.actions";
import WizardNavigationControl from "./WizardNavigationControl";

export default function Step3Page(props: any) {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  let id = parseInt(props.match.params.id);

  const error = useSelector((state: any) => state.operation.error);
  const operations = useSelector((state: any) =>
    RecordList.fromList(state.project.content.operations)
  );
  const shouldClearFields = useSelector(
    (state: any) => state.operation.clearFields
  );

  useEffect(() => {
    if (shouldClearFields) {
      setDescription("");
      setTrigger("");
      setInput("");
      setOutput("");
      dispatch(fieldsClear());
    }
  }, [shouldClearFields]);

  const nextAction = () =>
    saveOperationDetail(id, { description, trigger, input, output });

  return (
    <div className="fill-space flex-col">
      <h1>Operations - "{operations.byId(id).name}" details</h1>
      <Field
        value={description}
        placeholder="Operation description"
        onChange={setDescription}
      />
      <SpaceV />
      <Field
        value={trigger}
        placeholder="What triggers the operation*"
        onChange={setTrigger}
      />
      <SpaceV />
      <Field
        value={input}
        placeholder="Input payload name*"
        onChange={setInput}
      />
      <SpaceV />
      <Field
        value={output}
        placeholder="Output payload name"
        onChange={setOutput}
      />
      <SpaceFill />

      <WizardNavigationControl error={error} nextAction={nextAction} />
    </div>
  );
}
