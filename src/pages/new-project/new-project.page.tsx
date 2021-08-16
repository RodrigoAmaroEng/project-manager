import { Route, Switch } from "react-router-dom";
import ModalWindow from "../../components/Modal";
import TerminatorsPage from "./step-1/terminators.page";
import OperationsPage from "./step-2/operations.page";
import { WelcomePage } from "./welcome.page";

export default function NewProjectPage() {
  return (
    <ModalWindow className="half-width half-height">
      <Switch>
        <Route path="/project/new/2">
          <OperationsPage />
        </Route>
        <Route path="/project/new/1">
          <TerminatorsPage />
        </Route>
        <Route path="/project/new">
          <WelcomePage/>
        </Route>
      </Switch>
    </ModalWindow>
  );
}
