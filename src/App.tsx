import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GDriveApiInstance } from "./extras/gdrive-api";
import StartPage from "./pages/start/start.page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listFiles } from "./pages/start/start.slice";
import { setAuthenticatedUser } from "./App.actions";
import NewProjectPage from "./pages/new-project/new-project.page";
import DropDown, { Option } from "./components/DropDown";
import { Line, SpaceH } from "./components/Utils";

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

  const items = Array.from({ length: 20 }, (x, i) => i).map((item: number) => {
    return { name: `Item ${item}`, id: item };
  });
  return (
    <div className="App">
      <Switch>
        <Route path="/project/new">
          {window.sessionStorage.clear()}
          <NewProjectPage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
        <Route>Not found {window.location.pathname}</Route>
      </Switch>
    </div>
  );
}

export default App;
