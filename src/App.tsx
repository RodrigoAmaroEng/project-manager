import React from "react";
import "./App.css";
import Circle from "./components/Circle";
import List, { Row } from "./components/List";
import ModalWindow from "./components/Modal";
import StaticField from "./components/StaticField";
import { Tab, TabLayout } from "./components/TabLayout";

function App() {
  return (
    <div className="App">
      <ModalWindow>
        <TabLayout>
          <Tab title="New Project">Content for new project</Tab>
          <Tab title="Load Project">
            Content for loading project
            <List>
              <Row>
                <Circle>P</Circle>
                <span className="col-expand hspace">Projeto 1</span>
                <StaticField label="Last update" value="2020/03/06 - 07:00"/>
              </Row>
              <Row>
                <Circle>P</Circle>
                <span className="col-expand hspace">Projeto 2</span>
                <StaticField label="Last update" value="2020/03/06 - 07:00"/>
              </Row>
            </List>
          </Tab>
        </TabLayout>
      </ModalWindow>
    </div>
  );
}

export default App;
