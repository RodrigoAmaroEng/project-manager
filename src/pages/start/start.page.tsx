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

export default function StartPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.context.connector.user);

  const isLoadingConnector = useSelector(
    (state: any) => state.context.connector.isLoading
  );

  useEffect(() => {
    dispatch(deleteExistingProject());
  }, []);

  return (
    <ModalWindow className="half-width half-height">
      <h1>Project modeler</h1>
      <ConnectorLogin
        user={user}
        isLoading={isLoadingConnector}
        onClick={() => dispatch(authenticate())}
      />
      <SpaceV />
      <TabLayout>
        <Tab title="Create new">
          <NewProjectTab />
        </Tab>
        <Tab title="Open existing">
          <OpenProjectTab />
        </Tab>
      </TabLayout>
    </ModalWindow>
  );
}
