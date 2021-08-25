import { dismissError } from "../../App.actions";
import { MainButton, SecondaryButton } from "../../components/Button";
import ErrorBox from "../../components/ErrorBox";
import { Line, LineAlignment, SpaceH } from "../../components/Utils";
import { useDispatch } from "react-redux";
import { saveAndFinishWizard } from "./new-project.reducer";
import { GDriveApiInstance } from "../../extras/gdrive-api";

export default function WizardNavigationControl(props: any) {
  const dispatch = useDispatch();
  const onSkip = () => dispatch(saveAndFinishWizard(GDriveApiInstance.upload));
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
      <SecondaryButton onClick={onSkip}>Skip</SecondaryButton>
      <SpaceH />
      <MainButton onClick={() => dispatch(props.nextAction())}>Next</MainButton>
    </Line>
  );
}
