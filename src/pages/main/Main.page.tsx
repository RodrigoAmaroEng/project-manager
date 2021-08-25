import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CRUD from "../../components/CRUD";
import Menu, { MenuItem } from "../../components/Menu";
import { Payload } from "../../base/payload/Payload.model";
import { Entity } from "../../base/entity/Entity.model";
import { Operation } from "../../base/operation/Operation.model";
import { Terminator } from "../../base/terminator/Terminator.model";
import { navigateTo } from "./Main.actions";
import "./Main.page.css";
import { forModel } from "../../renderers/ForModel";
import { MainButton } from "../../components/Button";
import { saveAndFinishWizard } from "../new-project/new-project.reducer";
import { GDriveApiInstance } from "../../extras/gdrive-api";

export default function MainPage(props: any) {
  const dispatch = useDispatch();
  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
  const operations = useSelector(
    (state: any) => state.project.content.operations
  );
  const entities = useSelector((state: any) => state.project.content.entities);
  const payloads = useSelector((state: any) => state.project.content.payloads);

  return (
    <div className="main-structure">
      <header>
        <MainButton onClick={() => dispatch(saveAndFinishWizard(GDriveApiInstance.upload))}>
          Save
        </MainButton>
      </header>
      <aside>
        <Menu onChange={(name: string) => dispatch(navigateTo(name))}>
          <MenuItem name="Terminators" count={terminators.length} />
          <MenuItem name="Operations" count={operations.length} />
          <MenuItem name="Entities" count={entities.length} />
          <MenuItem name="Payloads" count={payloads.length} />
        </Menu>
      </aside>
      <article>
        <Switch>
          <Route path="/project/stored/terminators">
            <CRUD items={terminators} object={Terminator} renderer={forModel} />
          </Route>
          <Route path="/project/stored/operations">
            <CRUD items={operations} object={Operation} renderer={forModel} />
          </Route>
          <Route path="/project/stored/entities">
            <CRUD items={entities} object={Entity} renderer={forModel} />
          </Route>
          <Route path="/project/stored/payloads">
            <CRUD items={payloads} object={Payload} renderer={forModel} />
          </Route>
          <Route path="/project/stored">Main</Route>
        </Switch>
      </article>
    </div>
  );
}
