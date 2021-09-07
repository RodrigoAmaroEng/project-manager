import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GDriveApiInstance } from "./extras/gdrive-api";
import StartPage from "./pages/start/start.page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
      }
    }
  };
  useEffect(() => {
    GDriveApiInstance.removeListener(onConnectGDrive);
    GDriveApiInstance.registerListener(onConnectGDrive);
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/project/stored">
          <MainPage/>
        </Route>
        <Route path="/project/new">
          <NewProjectPage />
        </Route>
        <Route path="/privacy">
          <iframe src={process.env.PUBLIC_URL + '/privacy.html'}/>
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
