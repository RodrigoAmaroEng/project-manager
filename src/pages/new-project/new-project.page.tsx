import { Route, Switch } from "react-router-dom";
import ModalWindow from "../../components/Modal";
import Step1Page from "./step-1.page";
import Step2Page from "./step-2.page";
import { WelcomePage } from "./welcome.page";
import Step3Page from "./step-3.page";
import Step4Page from "./step-4.page";
import Step5Page from "./step-5.page";
import Step6Page from "./step-6.page";

export default function NewProjectPage() {
  return (
    <ModalWindow className="half-width half-height">
      <Switch>
        <Route
          path="/project/new/entities/:id"
          render={(props) => <Step5Page {...props} />}
        />
        <Route
          path="/project/new/operations/:id"
          render={(props) => <Step3Page {...props} />}
        />
        <Route
          path="/project/new/payloads/:id"
          render={(props) => <Step6Page {...props} />}
        />
        <Route path="/project/new/4">
          <Step4Page />
        </Route>
        <Route path="/project/new/2">
          <Step2Page />
        </Route>
        <Route path="/project/new/1">
          <Step1Page />
        </Route>
        <Route path="/project/new">
          <WelcomePage />
        </Route>
      </Switch>
    </ModalWindow>
  );
}
