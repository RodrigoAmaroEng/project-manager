import "./CRUD.css";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ListingForm from "./crud/ListingForm";
import RegistryForm from "./crud/RegistryForm";
import { RecordList } from "../extras/extension-functions";
import { useDispatch, useSelector } from "react-redux";
import history from "../navigation/history";
import { cancelOperation } from "../pages/main/Main.actions";
import { fieldsClear } from "../App.actions";
import Viewer from "./Viewer";

function saveObject(obj: any, type: any) {
  return { type: "crud/add-" + type.name.toLowerCase(), payload: obj };
}

export default function CRUD(props: any) {
  const dispatch = useDispatch();

  const onCancel = () => dispatch(cancelOperation());
  const onSave = (item: any) => {
    dispatch(saveObject(item, props.object));
  };
  const shouldClearFields = useSelector(
    (state: any) => state.operation.clearFields
  );
  const lastOperation = useSelector(
    (state: any) => state.operation.lastOperation
  );
  useEffect(() => {
    if (shouldClearFields && lastOperation.indexOf("add-simple") < 0) {
      let path = window.location.pathname.split("/")[3];
      history.push(`/project/stored/${path}`);
      dispatch(fieldsClear());
    }
  }, [shouldClearFields]);

  return (
    <Switch>
      <Route
        path="/project/stored/:object/edit/:id"
        render={(params: any) => (
          <RegistryForm
            renderer={props.renderer}
            onSearch={props.onSearch}
            onQueryItem={props.onQueryItem}
            object={props.object}
            item={RecordList.fromList(props.items).byId(
              parseInt(params.match.params.id)
            )}
            onCancel={onCancel}
            onSave={onSave}
          />
        )}
      ></Route>
      <Route path="/project/stored/:object/new">
        <RegistryForm
          object={props.object}
          onSearch={props.onSearch}
          onQueryItem={props.onQueryItem}
          onSave={onSave}
          onCancel={onCancel}
          renderer={props.renderer}
        />
      </Route>
      <Route
        path="/project/stored/:object/:id"
        render={(params: any) => (
          <Viewer
            object={props.object}
            onQueryItem={props.onQueryItem}
            onCancel={onCancel}
            item={RecordList.fromList(props.items).byId(
              parseInt(params.match.params.id)
            )}
          />
        )}
      ></Route>
      <Route path="/project/stored/:object">
        <ListingForm
          items={props.items}
          object={props.object}
          renderer={props.renderer}
        />
      </Route>
    </Switch>
  );
}
