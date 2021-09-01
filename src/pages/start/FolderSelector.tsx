import { useSelector } from "react-redux";
import { SquareMainButton } from "../../components/Button";
import List, { Action, IfEmpty, ListStyle, Row } from "../../components/List";
import ModalWindow from "../../components/Modal";
import { Line, SpaceFill, SpaceV } from "../../components/Utils";
import { buildPath } from "../../extras/extension-functions";

export default function FolderSelector(props: any) {
  const isLoading = useSelector((state: any) => state.start.files.isLoading);
  const path = useSelector((state: any) =>
    buildPath(state.start.files.selectedFolder)
  );
  return (
    <ModalWindow className="flex-col half-height half">
      <h1>Folders</h1>
      <Line>
        <span>
          <b>Path: </b>
          {path}
        </span>
        <SpaceFill />
        <SquareMainButton onClick={props.onGoUp}>&lt;</SquareMainButton>
      </Line>
      <SpaceV />

      <List
        listStyle={ListStyle.Clickable}
        onClick={props.onSelect}
        className="fill-space"
      >
        <IfEmpty>
          {isLoading ? "Loading folders..." : "No items to show"}
        </IfEmpty>
        <Action>
          <SquareMainButton onClick={props.onOpen}>O</SquareMainButton>
        </Action>
        {props.folders.map((folder: any) => (
          <Row item={folder} key={folder}>
            <h6>{folder.name}</h6>
          </Row>
        ))}
      </List>
    </ModalWindow>
  );
}
