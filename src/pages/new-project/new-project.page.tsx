import { Route, Switch } from "react-router-dom";
import ModalWindow from "../../components/Modal";
import TerminatorsPage from "./step-1/terminators.page";
import OperationsPage from "./step-2/operations.page";
import { WelcomePage } from "./step-0/welcome.page";
import OperationDetailsPage from "./step-3/operation-details.page";
import EntitiesPage from "./step-4/entities.page";
import EntityPropertiesPage from "./step-5/entity-properties.page";
import PayloadsPage from "./step-6/payload.page";

export default function NewProjectPage() {
  return (
    <ModalWindow className="half-width half-height">
      <Switch>
        <Route
          path="/project/new/entities/:id"
          render={(props) => <EntityPropertiesPage {...props} />}
        />
        <Route
          path="/project/new/operations/:id"
          render={(props) => <OperationDetailsPage {...props} />}
        />
        <Route
          path="/project/new/payloads/:id"
          render={(props) => <PayloadsPage {...props} />}
        />
        <Route path="/project/new/4">
          <EntitiesPage />
        </Route>
        <Route path="/project/new/2">
          <OperationsPage />
        </Route>
        <Route path="/project/new/1">
          <TerminatorsPage />
        </Route>
        <Route path="/project/new">
          <WelcomePage />
        </Route>
      </Switch>
    </ModalWindow>
  );
}
