import { Route, Switch } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/start.page";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <StartPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
