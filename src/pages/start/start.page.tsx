import Button, { ButtonType } from "../../components/Button";
import Circle from "../../components/Circle";
import Field from "../../components/Field";
import List, { ListStyle, Row } from "../../components/List";
import ModalWindow from "../../components/Modal";
import StaticField from "../../components/StaticField";
import { Tab, TabLayout } from "../../components/TabLayout";
import { SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  setProjectName,
  setSelectedProject,
} from "./start.slice";
import { authenticate, deleteExistingProject } from "../../App.actions";
import { ConnectorLogin } from "../../components/ConnectorLogin";
import "../../extras/extension-functions";
import "./start.page.css";
import { useEffect } from "react";

export default function StartPage() {
  const dispatch = useDispatch();
  const projectName = useSelector((state: any) => state.project.name);
  const user = useSelector(
    (state: any) => state.project.fileInfo.connector.user
  );
  const availableProjects = useSelector(
    (state: any) => state.project.fileInfo.connector.files || []
  );
  const hasProjectSelected = useSelector(
    (state: any) => !!state.project.fileInfo.fileName
  );
  const blockCreateButton = (!projectName || projectName?.length < 3);
  useEffect(() => {
    dispatch(deleteExistingProject());
  }, []);

  return (
    <ModalWindow className="half-width half-height">
      <h1>Project modeler</h1>
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
            {availableProjects.map((project: any) => (
              <Row item={project}>
                <Circle>P</Circle>
                <span className="col-expand hspace">{project.name}</span>
                <StaticField
                  label="Last update"
                  value={project.modifiedTime.toCompleteDateTime()}
                />
              </Row>
            ))}
          </List>
          <SpaceV />
          <ConnectorLogin
            user={user}
            onClick={() => dispatch(authenticate())}
          />
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
