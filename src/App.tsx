import { Route, Switch } from "react-router-dom";
import "./App.css";
import { GDriveApiInstance, GoogleUser } from "./extras/gdrive-api";
import StartPage from "./pages/start/start.page";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listFiles } from "./pages/start/start.slice";

function setAuthenticatedUser(user: GoogleUser) {
  return { type: "start/set-authenticated-user", payload: user };
}

function App() {
  const dispatch = useDispatch();

  const onConnectGDrive = (connStatus: any) => {
    if (connStatus && connStatus.isSignedIn) {
      dispatch(setAuthenticatedUser(connStatus.user));
      dispatch(listFiles(GDriveApiInstance.listFiles))
    }
  };
  useEffect(() => {
    GDriveApiInstance.removeListener(onConnectGDrive);
    GDriveApiInstance.registerListener(onConnectGDrive);
  },[])
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <StartPage />
        </Route>
        <Route path="/p/new">
          <StartPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
