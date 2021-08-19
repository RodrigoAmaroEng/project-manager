import Button, { ButtonType } from "../../components/Button";
import Circle from "../../components/Circle";
import List, { IfEmpty, ListStyle, Row } from "../../components/List";
import StaticField from "../../components/StaticField";
import { Tab } from "../../components/TabLayout";
import { Line, SpaceH, SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject, setShowFolders } from "./start.slice";
import { FOLDER_MIME_TYPE } from "../../extras/models";
import Switcher from "../../components/Switcher";

export function OpenProjectTab() {
  const dispatch = useDispatch();

  const isLoadingFiles = useSelector(
    (state: any) => state.start.files.isLoading
  );
  const showFolders = useSelector(
    (state: any) => state.start.files.showFolders
  );
  const availableProjects = useSelector(
    (state: any) => state.start.files.list || []
  );
  const hasProjectSelected = useSelector(
    (state: any) => !!state.project.fileInfo.fileName
  );

  const onSelectProject = (items: any[]) => {
    if (items.length > 0) {
      dispatch(setSelectedProject(availableProjects[items[0].index]));
    }
  };
  const onShowFolders = (checked: boolean) => dispatch(setShowFolders(checked));

  const renderEntryInfo = (entry: any) =>
    entry.mimeType === FOLDER_MIME_TYPE ? (
      <h6 className="one-fourth">Folder</h6>
    ) : (
      <StaticField
        className="one-fourth"
        label="Last update"
        value={entry.modifiedTime.toCompleteDateTime()}
      />
    );

  return (
    <div className="flex-col fill-space">
      <List
        className="fill-space"
        listStyle={ListStyle.SingleSelect}
        onSelectionChange={onSelectProject}
      >
        <IfEmpty>
          {isLoadingFiles
            ? "Loading Files"
            : "There is no project in your account"}
        </IfEmpty>
        {availableProjects
          .filter((p: any) => showFolders || p.mimeType !== FOLDER_MIME_TYPE)
          .map((project: any) => (
            <Row item={project}>
              <Circle>P</Circle>
              <SpaceH />
              <StaticField
                className="fill-space"
                label="File name"
                value={project.name}
              />
              {renderEntryInfo}
            </Row>
          ))}
      </List>
      <SpaceV />
      <Line>
        <Switcher
          label="Show folders"
          isChecked={showFolders}
          onChange={onShowFolders}
        />
      </Line>
      <SpaceV />
      <Button
        onClick={() => {}}
        type={ButtonType.secondary}
        disabled={!hasProjectSelected}
      >
        Load project
      </Button>
      <SpaceH />
    </div>
  );
}
