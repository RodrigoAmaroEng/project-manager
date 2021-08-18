import Button, { ButtonType } from "../../../components/Button";
import { Line, LineAlignment, SpaceH } from "../../../components/Utils";
import { goToStep } from "../new-project.actions";
import { useDispatch } from "react-redux";
import WizardNavigationControl from "../WizardNavigationControl";

export function WelcomePage() {
  const dispatch = useDispatch();

  return (
    <div className="flex-column">
      <h1>New project wizard</h1>
      <p style={{ flexGrow: 1 }}>
        Welcome to the project wizard!
        <br />
        <br />
        This tool will help you step by step to document your project quicker.
        <br />
        <br />
        If you want to skip this process at anytime, you can press the skip
        button.
        <br />
        <br />
        Press, next to proceed.
      </p>
      <WizardNavigationControl error="" nextAction={() => dispatch(goToStep(1))}/>
    
    </div>
  );
}
