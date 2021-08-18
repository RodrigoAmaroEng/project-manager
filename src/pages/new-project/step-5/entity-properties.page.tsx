import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, LineAlignment, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntityProperty,
  goToOperationDetails,
  removeEntityProperty,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import ErrorBox from "../../../components/ErrorBox";
import { dismissError } from "../../../App.actions";
import DropDown, { Option } from "../../../components/DropDown";
import { RecordList } from "../../../extras/extension-functions";
import { ReactComponent as PropertyIcon } from "../../../img/002-list.svg";
import StaticField from "../../../components/StaticField";
import { DataTypes } from "../../../extras/models";

export default function EntityPropertiesPage(props: any) {
  let entityId = parseInt(props.match.params.id);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState(undefined);
  const entity = useSelector((state: any) =>
    RecordList.fromList(state.project.content.entities).byId(entityId)
  );
  const properties = useSelector((state: any) => entity.properties || []);
  const error = useSelector((state: any) => state.operation.error);

  return (
    <div className="fill-space flex-col">
      <h1>Step 5 - "{entity.name}" entity properties</h1>
      <Line>
        <Field
          value={name}
          placeholder="Operation name"
          onChange={(value: string) => setName(value)}
        />
        <SpaceH />
        <DropDown
          onSelect={(item: any) => setType(item)}
          selected={type}
          className="fill-space"
        >
          {Object.values(DataTypes).map((key) => (
            <Option item={key}>
              <h6>{key}</h6>
            </Option>
          ))}
        </DropDown>
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => {
            dispatch(addEntityProperty(name, entityId, type));
            setName("");
            setType(undefined);
          }}
        >
          +
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first operation to see it here</IfEmpty>
        <Action>
          <Button
            type={ButtonType.main}
            onClick={(e: any) => dispatch(removeEntityProperty(e, entityId))}
          >
            -
          </Button>
        </Action>
        {properties.map((item: any) => (
          <Row item={item}>
            <Circle>
              <PropertyIcon />
            </Circle>
            <SpaceH />
            <StaticField
              className="fill-space"
              label="Property name"
              value={item.name}
            />
            <SpaceH />
            <StaticField
              className="one-fourth"
              label="Type"
              value={item.type}
            />

            <SpaceH />
          </Row>
        ))}
      </List>
      <SpaceV />
      <Line align={LineAlignment.right}>
        <ErrorBox visible={!!error} onDismiss={() => dispatch(dismissError())}>
          {error}
        </ErrorBox>
        <SpaceH />
        <Button type={ButtonType.secondary} onClick={() => {}}>
          Skip
        </Button>
        <SpaceH />
        <Button
          type={ButtonType.main}
          onClick={() => dispatch(goToOperationDetails())}
        >
          Next
        </Button>
      </Line>
    </div>
  );
}
