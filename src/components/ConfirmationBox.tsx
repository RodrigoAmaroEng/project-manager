import { useDispatch } from "react-redux";
import { answerNo, answerYes } from "../App.actions";
import { MainButton, SecondaryButton } from "./Button";
import ModalWindow from "./Modal";
import { Line, SpaceV } from "./Utils";

export default function ConfirmationBox(props: any) {
  const dispatch = useDispatch();
  if (!props.message) {
    return <span/>;
  }
  return (
    <ModalWindow>
      <SpaceV/>
      <h5>{props.message}</h5>
      <SpaceV/>
      <Line className="line-align-right">
        <SecondaryButton onClick={() => dispatch(answerNo())}>
          No
        </SecondaryButton>
        <MainButton onClick={() => dispatch(answerYes())}>Yes</MainButton>
      </Line>
    </ModalWindow>
  );
}
