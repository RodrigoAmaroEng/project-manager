import Button, { ButtonType } from "../../components/Button";
import Circle from "../../components/Circle";
import Field from "../../components/Field";
import List, { IfEmpty, ListStyle, Row } from "../../components/List";
import ModalWindow from "../../components/Modal";
import StaticField from "../../components/StaticField";
import { Tab, TabLayout } from "../../components/TabLayout";
import { Line, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  setProjectName,
  setSelectedProject,
  setShowFolders,
} from "./start.slice";
import { authenticate, deleteExistingProject } from "../../App.actions";
import { ConnectorLogin } from "../../components/ConnectorLogin";
import "../../extras/extension-functions";
import "./start.page.css";
import { useEffect } from "react";
import { FOLDER_MIME_TYPE } from "../../extras/models";
import Switcher from "../../components/Switcher";

export default function StartPage() {
  const dispatch = useDispatch();
  const projectName = useSelector((state: any) => state.project.name);
  const user = useSelector(
    (state: any) => state.project.fileInfo.connector.user
  );
  const availableProjects = useSelector(
    (state: any) => state.start.files.list || []
  );
  const hasProjectSelected = useSelector(
    (state: any) => !!state.project.fileInfo.fileName
  );
  const isLoadingConnector = useSelector(
    (state: any) => state.project.fileInfo.connector.isLoading
  );
  const isLoadingFiles = useSelector(
    (state: any) => state.start.files.isLoading
  );
  const showFolders = useSelector(
    (state: any) => state.start.files.showFolders
  );
  const blockCreateButton = !projectName || projectName?.length < 3;
  useEffect(() => {
    dispatch(deleteExistingProject());
  }, []);

  return (
    <ModalWindow className="half-width half-height">
      <h1>Project modeler</h1>
      <ConnectorLogin
        user={user}
        isLoading={isLoadingConnector}
        onClick={() => dispatch(authenticate())}
      />
      <SpaceV />
      <TabLayout>
        <Tab title="Create new">
          <Field
            placeholder="Project name"
            onChange={(name: string) => dispatch(setProjectName(name))}
          />

          <SpaceV />
          <Button
            onClick={() => dispatch(createProject())}
            type={ButtonType.main}
            disabled={blockCreateButton}
          >
            Create
          </Button>
        </Tab>
        <Tab title="Open existing">
          <List
            className="fill-space"
            listStyle={ListStyle.SingleSelect}
            onSelectionChange={(items: any[]) => {
              if (items.length > 0) {
                dispatch(setSelectedProject(availableProjects[items[0].index]));
              }
            }}
          >
            <IfEmpty>
              {isLoadingFiles
                ? "Loading Files"
                : "There is no project in your account"}
            </IfEmpty>
            {availableProjects.filter((p:any) => showFolders || p.mimeType !== FOLDER_MIME_TYPE).map((project: any) => (
              <Row item={project}>
                <Circle>P</Circle>
                <SpaceH />
                <StaticField
                  className="fill-space"
                  label="File name"
                  value={project.name}
                />
                {project.mimeType === FOLDER_MIME_TYPE ? (
                  <h6 className="one-fourth">Folder</h6>
                ) : (
                  <StaticField
                    className="one-fourth"
                    label="Last update"
                    value={project.modifiedTime.toCompleteDateTime()}
                  />
                )}
              </Row>
            ))}
          </List>
          <SpaceV />
          <Line>
            <Switcher
              label="Show folders"
              isChecked={showFolders}
              onChange={(checked: boolean) => dispatch(setShowFolders(checked))}
            />
          </Line>
          <SpaceV />
          <Button
            onClick={() => {}}
            type={ButtonType.secondary}
            disabled={!hasProjectSelected}
          >
            Load project
          </Button>
          <SpaceH />
        </Tab>
      </TabLayout>
    </ModalWindow>
  );
}
