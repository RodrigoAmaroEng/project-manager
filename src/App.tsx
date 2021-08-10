import React from "react";
import "./App.css";
import ModalWindow from "./components/Modal";
import { Tab, TabLayout } from "./components/TabLayout";

function App() {
  return (
    <div className="App">
      <ModalWindow>
        <TabLayout>
          <Tab title="New Project">
            Content for new project
          </Tab>
          <Tab title="Load Project">
            Content for loading project
          </Tab>
        </TabLayout>
      </ModalWindow>
    </div>
  );
}

export default App;
