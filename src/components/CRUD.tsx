import "./CRUD.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ListingForm from "./crud/ListingForm";
import RegistryForm from "./crud/RegistryForm";
export default function CRUD(props: any) {
  return (
    <Switch>
      <Route path="/project/stored/:object/edit/:id">4</Route>
      <Route path="/project/stored/:object/new">
        <RegistryForm />
      </Route>
      <Route path="/project/stored/:object/:id">2</Route>
      <Route path="/project/stored/:object">
        <ListingForm items={props.items} />
      </Route>
    </Switch>
  );
}
