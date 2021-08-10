import React from "react";
import "./App.css";
import CButton, { ButtonType } from "./components/Button";
import Circle from "./components/Circle";
import Field from "./components/Field";
import List, { ListStyle, Row } from "./components/List";
import ModalWindow from "./components/Modal";
import StaticField from "./components/StaticField";
import { Tab, TabLayout } from "./components/TabLayout";

function SpaceH(){
  return (<span className="spacer-h"/>)
}
function SpaceV(){
  return (<span className="spacer-v"/>)
}

function App() {
  return (
    <div className="App">
      <ModalWindow>
        <h1>Project modeler</h1>
        <TabLayout>
          <Tab title="New Project">
            <Field />
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
            <SpaceV/>
            <CButton onClick={() => {}} type={ButtonType.secondary}>
              Cancel
            </CButton>
            <SpaceH/>
            <CButton onClick={() => {}} type={ButtonType.main}>
              Create
            </CButton>
          </Tab>
        </TabLayout>
      </ModalWindow>
    </div>
  );
}

export default App;
