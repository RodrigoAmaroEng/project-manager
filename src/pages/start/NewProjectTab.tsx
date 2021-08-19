import Button, { ButtonType } from "../../components/Button";
import Field from "../../components/Field";
import StaticField from "../../components/StaticField";
import { Line, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  setProjectName
} from "./start.slice";
import { GDriveApiInstance } from "../../extras/gdrive-api";

export function NewProjectTab() {
  const dispatch = useDispatch();
  const projectName = useSelector((state: any) => state.project.name);
  const blockCreateButton = !projectName || projectName?.length < 3;

  return (
    <div className="flex-col">
      <Field
        placeholder="Project name"
        onChange={(name: string) => dispatch(setProjectName(name))} />
      <SpaceV />
      <Line>
        <StaticField label="Location" value="Root Folder" />
        <SpaceH />
        <Button type={ButtonType.secondary} onClick={() => { }}>
          Change
        </Button>
      </Line>
      <SpaceV />
      <Button
        onClick={() => dispatch(createProject(GDriveApiInstance.upload))}
        type={ButtonType.main}
        disabled={blockCreateButton}
      >
        Create
      </Button>
    </div>
  );
}
