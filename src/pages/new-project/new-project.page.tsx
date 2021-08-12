import { Route, Switch } from "react-router-dom";
import Button, { ButtonType } from "../../components/Button";
import ModalWindow from "../../components/Modal";
import { Line, LineAlignment, SpaceH } from "../../components/Utils";
import { useDispatch } from "react-redux";
import { goToStep } from "./new-project.actions";
import TerminatorsPage from "./step-1/terminators.page";
import OperationsPage from "./step-2/operations.page";

export default function NewProjectPage(props: any) {
  const dispatch = useDispatch();
  return (
    <ModalWindow className="half-width half-height">
      <Switch>
        <Route path="/project/new/1">
          <TerminatorsPage />
        </Route>
        <Route path="/project/new/2">
          <OperationsPage />
        </Route>
        <Route path="/project/new">
          <h1>New project wizard</h1>
          <p style={{ flexGrow: 1 }}>
            Welcome to the project wizard!
            <br />
            <br />
            This tool will help you step by step to document your project
            quicker.
            <br />
            <br />
            If you want to skip this process at anytime, you can press the skip
            button.
            <br />
            <br />
            Press, next to proceed.
          </p>
          <Line align={LineAlignment.right}>
            <Button type={ButtonType.secondary} onClick={() => {}}>
              Skip
            </Button>
            <SpaceH />
            <Button
              type={ButtonType.main}
              onClick={() => dispatch(goToStep(1))}
            >
              Next
            </Button>
          </Line>
        </Route>
      </Switch>
    </ModalWindow>
  );
}
