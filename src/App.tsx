import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GDriveApiInstance } from "./extras/gdrive-api";
import StartPage from "./pages/start/start.page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listFiles } from "./pages/start/start.slice";
import { setAuthenticatedUser } from "./App.actions";
import NewProjectPage from "./pages/new-project/new-project.page";

function App() {
  const dispatch = useDispatch();

  const onConnectGDrive = (connStatus: any) => {
    if (connStatus && connStatus.isSignedIn) {
      dispatch(setAuthenticatedUser(connStatus.user));
      dispatch(listFiles(GDriveApiInstance.listFiles));
    }
  };
  useEffect(() => {
    GDriveApiInstance.removeListener(onConnectGDrive);
    GDriveApiInstance.registerListener(onConnectGDrive);
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/project/new">
          <NewProjectPage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
