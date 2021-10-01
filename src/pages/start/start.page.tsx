import ModalWindow from "../../components/Modal";
import { Tab, TabLayout } from "../../components/TabLayout";
import { SpaceV } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, deleteExistingProject } from "../../App.actions";
import { ConnectorLogin } from "../../components/ConnectorLogin";
import "../../extras/extension-functions";
import "./start.page.css";
import { useEffect } from "react";
import { OpenProjectTab } from "./OpenProjectTab";
import { NewProjectTab } from "./NewProjectTab";
import {
  backToParentFolder,
  closeFolderSelection,
  listFiles,
  openFolder,
  selectFolder,
} from "./start.slice";
import { GDriveApiInstance } from "../../extras/gdrive-api";
import FolderSelector from "./FolderSelector";

export default function StartPage() {
  const dispatch = useDispatch();
  const showFolderSelector = useSelector(
    (state: any) => state.start.files.folderSelectionOpen
  );
  const isAuthenticated = useSelector(
    (state: any) => state.context.connector.isAuthenticated
  );
  const user = useSelector((state: any) => state.context.connector.user);
  const folders = useSelector((state: any) => state.start.files.list);
  const isLoadingConnector = useSelector(
    (state: any) => state.context.connector.isLoading
  );

  useEffect(() => {
    dispatch(deleteExistingProject());
  }, []);

  const onOpenFolder = (folder: any) => {
    if (isAuthenticated)
      dispatch(openFolder(folder, GDriveApiInstance.listFolders));
  };
  const onGoUp = () => {
    if (isAuthenticated)
      dispatch(backToParentFolder(GDriveApiInstance.listFolders));
  };
  const onSelect = (folder: any) => dispatch(selectFolder(folder));

  const onLoadFolders = () => {
    if (isAuthenticated) dispatch(listFiles(GDriveApiInstance.listFolders));
  };
  const onLoadFiles = () => {
    if (isAuthenticated) dispatch(listFiles(GDriveApiInstance.listFiles));
  };
const onCloseFolders = () => dispatch(closeFolderSelection())

  const doAuth = () => dispatch(authenticate());
  return (
    <ModalWindow className="half-width half-height">
      <h1>Project modeler</h1>
      <ConnectorLogin
        user={user}
        isLoading={isLoadingConnector}
        onClick={doAuth}
      />
      <SpaceV />
      {showFolderSelector ? (
        <FolderSelector
          folders={folders}
          onLoad={onLoadFolders}
          onOpen={onOpenFolder}
          onGoUp={onGoUp}
          onClose={onCloseFolders}
          onSelect={onSelect}
        />
      ) : (
        ""
      )}
      <TabLayout>
        <Tab title="Create new">
          <NewProjectTab />
        </Tab>
        <Tab title="Open existing" onShow={onLoadFiles}>
          <OpenProjectTab />
        </Tab>
      </TabLayout>
    </ModalWindow>
  );
}
