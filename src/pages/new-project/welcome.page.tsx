import { startWizard } from "./new-project.actions";
import { useDispatch } from "react-redux";
import WizardNavigationControl from "./WizardNavigationControl";

export function WelcomePage() {
  const dispatch = useDispatch();
const nextAction = () => startWizard()
  return (
    <div className="flex-col fill-space">
      <h1>New project wizard</h1>
      <p className="fill-space">
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
      <WizardNavigationControl error="" nextAction={nextAction}/>
  
    </div>
  );
}
