import { useState } from "react";
import Button, { ButtonType } from "../Button";
import Field from "../Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../List";
import { Line, SpaceFill, SpaceV } from "../Utils";
import { ReactComponent as AddIcon } from "../../img/add-icon.svg";
import { ReactComponent as RemoveIcon } from "../../img/remove-icon.svg";
import { ReactComponent as EditIcon } from "../../img/edit-icon.svg";

export default function ListingForm(props: any) {
  const [query, setQuery] = useState(undefined);
  return (
    <div className="form-listing">
      <Line className="form-actions">
        <Field
          placeholder="Type the terminator you're searching for"
          className="one-third"
          onChange={setQuery}
        />
        <SpaceFill />
        <Button type={ButtonType.main} onClick={() => {}} className="square">
          <AddIcon />
        </Button>
      </Line>
      <SpaceV  />

      <div className="form-list">
        <List listStyle={ListStyle.Normal} className="fill-space">
          <IfEmpty>No terminator is registered.</IfEmpty>
          <Action>
            <Button
              type={ButtonType.main}
              onClick={() => {
                alert("Editar");
              }}
              className="square"
            >
              <EditIcon />
            </Button>
          </Action>
          <Action>
            <Button
              type={ButtonType.main}
              onClick={() => {
                alert("Apagar");
              }}
              className="square"
            >
              <RemoveIcon />
            </Button>
          </Action>
          {props.items
            .filter(
              (item: any) =>
                !query ||
                item.name.toLowerCase().indexOf(query ?? "".toLowerCase()) > -1
            )
            .map((item: any) => (
              <Row item={item}>
                <h6>{item.name}</h6>
              </Row>
            ))}
        </List>
      </div>
    </div>
  );
}
