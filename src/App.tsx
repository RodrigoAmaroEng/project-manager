import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GDriveApiInstance } from "./extras/gdrive-api";
import StartPage from "./pages/start/start.page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listFiles } from "./pages/start/start.slice";
import { setAuthenticatedUser, setIsInitialized } from "./App.actions";
import NewProjectPage from "./pages/new-project/new-project.page";
import MainPage from "./pages/main/Main.page";

function App() {
  const dispatch = useDispatch();

  const onConnectGDrive = (connStatus: any) => {
    if (connStatus) {
      if (connStatus.isInitialized) dispatch(setIsInitialized());
      if (connStatus.isSignedIn) {
        dispatch(setAuthenticatedUser(connStatus.user));
        dispatch(listFiles(GDriveApiInstance.listFiles));
      }
    }
  };
  useEffect(() => {
    GDriveApiInstance.removeListener(onConnectGDrive);
    GDriveApiInstance.registerListener(onConnectGDrive);
  }, []);

  const projectName = useSelector((state: any) => state.project.name);
  return (
    <div className="App">
      <Switch>
        <Route path="/project/stored">
          <MainPage/>
        </Route>
        <Route path="/project/new">
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
