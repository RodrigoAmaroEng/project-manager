import "./CRUD.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ListingForm from "./crud/ListingForm";
import RegistryForm from "./crud/RegistryForm";
import { RecordList } from "../extras/extension-functions";
import { useDispatch } from "react-redux";
import history from "../navigation/history";

function saveObject(obj: any, type: any) {
  return { type: "crud/add-" + type.name.toLowerCase(), payload: obj };
}

export default function CRUD(props: any) {
  const dispatch = useDispatch();
  const onSave = (item: any) => {
    dispatch(saveObject(item, props.object));
    let path = window.location.pathname.split("/")[3];
    history.push(`/project/stored/${path}`);
  };
  return (
    <Switch>
      <Route
        path="/project/stored/:object/edit/:id"
        render={(params: any) => (
          <RegistryForm
            renderer={props.renderer}
            object={props.object}
            item={RecordList.fromList(props.items).byId(
              parseInt(params.match.params.id)
            )}
            onSave={onSave}
          />
        )}
      ></Route>
      <Route path="/project/stored/:object/new">
        <RegistryForm
          object={props.object}
          onSave={onSave}
          renderer={props.renderer}
        />
      </Route>
      <Route path="/project/stored/:object/:id">2</Route>
      <Route path="/project/stored/:object">
        <ListingForm items={props.items} object={props.object} renderer={props.renderer}/>
      </Route>
    </Switch>
  );
}
