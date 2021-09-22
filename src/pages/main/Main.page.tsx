import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CRUD from "../../components/CRUD";
import Menu, { MenuItem } from "../../components/Menu";
import { Payload } from "../../base/payload/Payload.model";
import { Entity } from "../../base/entity/Entity.model";
import { Operation } from "../../base/operation/Operation.model";
import { Terminator } from "../../base/terminator/Terminator.model";
import { navigateTo, saveProject } from "./Main.actions";
import "./Main.page.css";
import { forModel } from "../../renderers/ForModel";
import { GDriveApiInstance } from "../../extras/gdrive-api";
import { findObject, searchObject } from "../../extras/models";
import {
  ConfigIcon,
  FindIcon,
  HomeIcon,
  NewEntityIcon,
  NewOperationIcon,
  NewPayloadIcon,
  NewTerminatorIcon,
  ReportIcon,
  SaveIcon,
} from "../../img/Icons";
import ConfirmationBox from "../../components/ConfirmationBox";
import { Chart } from "../../components/Chart";

export default function MainPage(props: any) {
  const dispatch = useDispatch();
  const content = useSelector((state: any) => state.project.content);
  const terminators = content.terminators;
  const operations = content.operations;
  const entities = content.entities;
  const payloads = content.payloads;

  const message = useSelector((state: any) => state.operation.message);
  const somethingToConfirm = useSelector(
    (state: any) => state.operation.waitingToConfirm
  );

  const onSearch = (search: string) => searchObject(content, search);
  const onQueryItem = (id: number, type: string) =>
    findObject(content, id, type);

  return (
    <div className="main-structure">
      <ConfirmationBox message={somethingToConfirm?.message} />
      <header>
        <span>
          <SaveIcon
            onClick={() => dispatch(saveProject(GDriveApiInstance.upload))}
          />
          <label>Save</label>
        </span>
        <span>
          <ConfigIcon />
          <label>Config</label>
        </span>
        <span>
          <FindIcon />
          <label>Search</label>
        </span>
        <span>
          <ReportIcon />
          <label>Report</label>
        </span>
        {message ? <div className="message">{message}</div> : ""}
      </header>
      <aside>
        <Menu onChange={(name: string) => dispatch(navigateTo(name))}>
          <MenuItem name="Home" icon={<HomeIcon />} />
          <MenuItem
            name="Terminators"
            icon={<NewTerminatorIcon />}
            count={terminators.length}
          />
          <MenuItem
            name="Operations"
            icon={<NewOperationIcon />}
            count={operations.length}
          />
          <MenuItem
            name="Entities"
            icon={<NewEntityIcon />}
            count={entities.length}
          />
          <MenuItem
            name="Payloads"
            icon={<NewPayloadIcon />}
            count={payloads.length}
          />
        </Menu>
      </aside>
      <article>
        <Switch>
          <Route path="/project/stored/terminators">
            <CRUD
              items={terminators}
              object={Terminator}
              renderer={forModel}
              onSearch={onSearch}
              onQueryItem={onQueryItem}
            />
          </Route>
          <Route path="/project/stored/operations">
            <CRUD
              items={operations}
              object={Operation}
              renderer={forModel}
              onSearch={onSearch}
              onQueryItem={onQueryItem}
            />
          </Route>
          <Route path="/project/stored/entities">
            <CRUD
              items={entities}
              object={Entity}
              renderer={forModel}
              onSearch={onSearch}
              onQueryItem={onQueryItem}
            />
          </Route>
          <Route path="/project/stored/payloads">
            <CRUD
              items={payloads}
              object={Payload}
              renderer={forModel}
              onSearch={onSearch}
              onQueryItem={onQueryItem}
            />
          </Route>
          <Route path="/project/stored">
            <div className="half">
              <h6>DFD - Level 0</h6>
              <Chart />
            </div>
          </Route>
        </Switch>
      </article>
    </div>
  );
}
