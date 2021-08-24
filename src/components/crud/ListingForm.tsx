import { useState } from "react";
import Button, { ButtonType } from "../Button";
import Field from "../Field";
import List, { Action, IfEmpty, ListStyle, Row } from "../List";
import { Line, SpaceFill, SpaceV } from "../Utils";
import { useDispatch } from "react-redux";
import { editRecord } from "../../pages/main/Main.actions";
import { Record } from "../../extras/extension-functions";
import { AddIcon, EditIcon, RemoveIcon } from "../../img/Icons";

export default function ListingForm(props: any) {
  const dispatch = useDispatch();

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
      <SpaceV />

      <div className="form-list">
        <List listStyle={ListStyle.Normal} className="fill-space">
          <IfEmpty>No terminator is registered.</IfEmpty>
          <Action>
            <Button
              type={ButtonType.main}
              onClick={(item: Record) => dispatch(editRecord(item.id))}
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
