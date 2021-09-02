import {
  MainButton,
  SecondaryButton,
  SquareMainButton,
} from "../../components/Button";
import Circle from "../../components/Circle";
import List, { Action, IfEmpty, ListStyle, Row } from "../../components/List";
import StaticField from "../../components/StaticField";
import { Line, SpaceFill, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  backToParentFolder,
  listFiles,
  loadProjectFromStorage,
  loadProjectToWizard,
  openFolder,
  setSelectedProject,
  setShowFolders,
} from "./start.slice";
import { FOLDER_MIME_TYPE } from "../../extras/models";
import Switcher from "../../components/Switcher";
import { GDriveApiInstance } from "../../extras/gdrive-api";
import { buildPath } from "../../extras/extension-functions";
import { useEffect } from "react";
import {
  FolderIcon,
  GoUpIcon,
  OpenFolderIcon,
  ReportIcon,
} from "../../img/Icons";

export function OpenProjectTab() {
  const dispatch = useDispatch();

  const isLoadingFiles = useSelector(
    (state: any) => state.start.files.isLoading
  );
  const showFolders = useSelector(
    (state: any) => state.start.files.showFolders
  );
  const availableProjects = useSelector((state: any) =>
    (state.start.files.list || []).filter(
      (p: any) => showFolders || p.mimeType !== FOLDER_MIME_TYPE
    )
  );
  const hasProjectSelected = useSelector(
    (state: any) => !!state.start.selectedFileId
  );

  const onSelectProject = (items: any[]) => {
    if (items.length > 0) {
      dispatch(setSelectedProject(availableProjects[items[0].index]));
    }
  };
  const onShowFolders = (checked: boolean) => dispatch(setShowFolders(checked));
  const loadProject = () =>
    dispatch(loadProjectFromStorage(GDriveApiInstance.download));

  const loadProjectWizard = () =>
    dispatch(loadProjectToWizard(GDriveApiInstance.download));

  const folderPath = useSelector((state: any) =>
    buildPath(state.start.files.selectedFolder)
  );
  useEffect(() => {
    dispatch(listFiles(GDriveApiInstance.listFiles));
  }, []);
  const onGoUp = () =>
    dispatch(backToParentFolder(GDriveApiInstance.listFiles));
  const selection = useSelector(
    (state: any) => state.start.files.selectedFolder
  );
  const renderEntryInfo = (entry: any) =>
    entry.mimeType === FOLDER_MIME_TYPE ? (
      <Line className="align-line-right">
        <SquareMainButton onClick={() => onOpenFolder(entry)}>
          <OpenFolderIcon />
        </SquareMainButton>
      </Line>
    ) : (
      <StaticField
        className="one-fourth"
        label="Last update"
        value={entry.modifiedTime.toCompleteDateTime()}
      />
    );
  const onOpenFolder = (folder: any) => {
    dispatch(openFolder(folder, GDriveApiInstance.listFolders));
  };
  return (
    <div className="flex-col fill-space">
      <Line>
        <span>
          <b>Path:</b> {folderPath}
        </span>
        <SpaceFill />
        <SquareMainButton onClick={onGoUp}>
          <GoUpIcon />
        </SquareMainButton>
      </Line>

      <SpaceV />
      <List
        className="fill-space"
        listStyle={ListStyle.SingleSelect}
        onSelectionChange={onSelectProject}
      >
        <IfEmpty>
          {isLoadingFiles
            ? "Loading Files"
            : "There is no project in your account"}
        </IfEmpty>

        {availableProjects.map((project: any, index: number) => (
          <Row item={project} key={index}>
            <Circle>
              {project.mimeType === FOLDER_MIME_TYPE ? (
                <FolderIcon />
              ) : (
                <ReportIcon />
              )}
            </Circle>
            <SpaceH />
            <StaticField
              className="fill-space"
              label="File name"
              value={project.name}
            />
            {renderEntryInfo(project)}
          </Row>
        ))}
      </List>
      <SpaceV />
      <Line>
        <Switcher
          label="Show folders"
          isChecked={showFolders}
          onChange={onShowFolders}
        />
      </Line>
      <SpaceV />
      <Line>
        <SecondaryButton
          className="half"
          onClick={loadProjectWizard}
          disabled={!hasProjectSelected}
        >
          Load project in Wizard mode
        </SecondaryButton>
        <SpaceH />
        <MainButton
          className="half"
          onClick={loadProject}
          disabled={!hasProjectSelected}
        >
          Load project
        </MainButton>
      </Line>

      <SpaceH />
    </div>
  );
}
