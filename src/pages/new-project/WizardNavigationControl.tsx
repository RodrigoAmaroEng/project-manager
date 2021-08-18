import { dismissError } from "../../App.actions";
import Button, { ButtonType } from "../../components/Button";
import ErrorBox from "../../components/ErrorBox";
import { Line, LineAlignment, SpaceH } from "../../components/Utils";
import { useDispatch } from "react-redux";

export default function WizardNavigationControl(props: any) {
  const dispatch = useDispatch();
  return (
    <Line align={LineAlignment.right}>
      <ErrorBox
        visible={!!props.error}
        className="fill-space"
        onDismiss={() => dispatch(dismissError())}
      >
        {props.error}
      </ErrorBox>
      <SpaceH />
      <Button type={ButtonType.secondary} onClick={() => {}}>
        Skip
      </Button>
      <SpaceH />
      <Button type={ButtonType.main} onClick={() => dispatch(props.nextAction())}>
        Next
      </Button>
    </Line>
  );
}
