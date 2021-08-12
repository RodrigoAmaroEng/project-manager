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
  authenticate,
  createProject,
  setProjectName,
  setSelectedProject,
} from "./start.slice";

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
  const blockCreateButton = !(!!projectName && projectName.length >= 3);

  return (
    <ModalWindow>
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
            listStyle={ListStyle.SingleSelect}
            onSelectionChange={(items: any[]) => {
              if (items.length > 0) {
                dispatch(setSelectedProject(availableProjects[items[0].index]));
              }
            }}
          >
            {availableProjects.map((project: any) => (
              <Row>
                <Circle>P</Circle>
                <span className="col-expand hspace">{project.name}</span>
                <StaticField label="Last update" value="2020/03/06 - 07:00" />
              </Row>
            ))}
          </List>
          <SpaceV />
          <div onClick={() => dispatch(authenticate())}>
            {user ? user.name : "Click to login"}
          </div>
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
