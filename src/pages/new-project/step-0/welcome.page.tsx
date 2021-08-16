import Button, { ButtonType } from "../../../components/Button";
import { Line, LineAlignment, SpaceH } from "../../../components/Utils";
import { goToStep } from "../new-project.actions";
import { useDispatch } from "react-redux";

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
      <Line align={LineAlignment.right}>
        <Button type={ButtonType.secondary} onClick={() => {}}>
          Skip
        </Button>
        <SpaceH />
        <Button type={ButtonType.main} onClick={() => dispatch(goToStep(1))}>
          Next
        </Button>
      </Line>
    </div>
  );
}
