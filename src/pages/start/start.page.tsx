import Button, { ButtonType } from "../../components/Button";
import Circle from "../../components/Circle";
import Field from "../../components/Field";
import List, { ListStyle, Row } from "../../components/List";
import ModalWindow from "../../components/Modal";
import StaticField from "../../components/StaticField";
import { Tab, TabLayout } from "../../components/TabLayout";
import { SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { createProject, setProjectName } from "./start.slice";
import { useState } from "react";


export default function StartPage() {
  const dispatch = useDispatch();
  const projectName = useSelector((state: any) => state.project.name);
  const blockCreateButton = !(!!projectName && projectName.length >=3)
  return (
    <ModalWindow>
      <h1>Project modeler</h1>
      <TabLayout>
        <Tab title="New Project">
          <Field placeholder="Project name" onChange={(name: string) => dispatch(setProjectName(name))} />
          <SpaceV/>
          <Button onClick={() => dispatch(createProject())} type={ButtonType.main} disabled={blockCreateButton}>
            Create
          </Button>
        </Tab>
        <Tab title="Load Project">
          <List listStyle={ListStyle.SingleSelect}>
            <Row>
              <Circle>P</Circle>
              <span className="col-expand hspace">Projeto 1</span>
              <StaticField label="Last update" value="2020/03/06 - 07:00" />
            </Row>
            <Row>
              <Circle>P</Circle>
              <span className="col-expand hspace">Projeto 2</span>
              <StaticField label="Last update" value="2020/03/06 - 07:00" />
            </Row>
          </List>
          <SpaceV />
          <Button onClick={() => {}} type={ButtonType.secondary} disabled={true} >
            Cancel
          </Button>
          <SpaceH />
          
        </Tab>
      </TabLayout>
    </ModalWindow>
  );
}
