import { MainButton, SquareSecondaryButton } from "../../components/Button";
import Field from "../../components/Field";
import StaticField from "../../components/StaticField";
import { Line, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { chooseFolder, createProject, setProjectName } from "./start.slice";
import { GDriveApiInstance } from "../../extras/gdrive-api";
import { FolderIcon } from "../../img/Icons";
import { buildPath } from "../../extras/extension-functions";

export function NewProjectTab() {
  const dispatch = useDispatch();
  const projectName = useSelector((state: any) => state.project.name);
  const blockCreateButton = !projectName || projectName?.length < 3;

  const folderPath = useSelector((state: any) =>
    buildPath(state.start.files.selectedFolder)
  );

  const updateProjectName = (name: string) => dispatch(setProjectName(name));
  const requestChangeFolder = () => dispatch(chooseFolder());
  const doCreateProject = () =>
    dispatch(createProject(GDriveApiInstance.upload));
  return (
    <div className="flex-col">
      <Field placeholder="Project name" onChange={updateProjectName} />
      <SpaceV />
      <Line>
        <FolderIcon className="small-icon" />
        <SpaceH />
        <StaticField label="Location" value={folderPath} />
        <SpaceH />
        <SquareSecondaryButton onClick={requestChangeFolder}>
          ...
        </SquareSecondaryButton>
      </Line>
      <SpaceV />
      <MainButton onClick={doCreateProject} disabled={blockCreateButton}>
        Create
      </MainButton>
    </div>
  );
}
