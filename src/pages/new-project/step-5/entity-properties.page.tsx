import Button, { ButtonType } from "../../../components/Button";
import Field from "../../../components/Field";
import List, {
  Action,
  IfEmpty,
  ListStyle,
  Row,
} from "../../../components/List";
import { Line, SpaceH, SpaceV } from "../../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntityProperty,
  goToPayloadProperties,
  removeEntityProperty,
} from "../new-project.actions";
import { useState } from "react";
import Circle from "../../../components/Circle";
import DropDown, { Option } from "../../../components/DropDown";
import { RecordList } from "../../../extras/extension-functions";
import { ReactComponent as PropertyIcon } from "../../../img/property-icon.svg";
import { ReactComponent as AddIcon } from "../../../img/add-icon.svg";
import { ReactComponent as RemoveIcon } from "../../../img/remove-icon.svg";
import StaticField from "../../../components/StaticField";
import { DataTypes } from "../../../extras/models";
import WizardNavigationControl from "../WizardNavigationControl";

export default function EntityPropertiesPage(props: any) {
  const dispatch = useDispatch();

  let entityId = parseInt(props.match.params.id);

  const [name, setName] = useState("");
  const [type, setType] = useState(undefined);

  const entity = useSelector((state: any) =>
    RecordList.fromList(state.project.content.entities).byId(entityId)
  );
  const properties = useSelector((state: any) => entity.properties || []);
  const error = useSelector((state: any) => state.operation.error);

  const add = () => {
    dispatch(addEntityProperty(name, entityId, type));
    setName("");
    setType(undefined);
  };
  const remove = (e: any) => dispatch(removeEntityProperty(e, entityId));
  const nextAction = () => dispatch(goToPayloadProperties());

  return (
    <div className="fill-space flex-col">
      <h1>Step 5 - "{entity.name}" entity properties</h1>
      <Line>
        <Field value={name} placeholder="Operation name" onChange={setName} />
        <SpaceH />
        <DropDown onSelect={setType} selected={type} className="fill-space">
          {Object.values(DataTypes).map((key) => (
            <Option item={key}>
              <h6>{key}</h6>
            </Option>
          ))}
        </DropDown>
        <SpaceH />
        <Button type={ButtonType.main} onClick={add} className="square">
          <AddIcon />
        </Button>
      </Line>
      <SpaceV />
      <List listStyle={ListStyle.Normal} className="fill-space">
        <IfEmpty>Add your first operation to see it here</IfEmpty>
        <Action>
          <Button type={ButtonType.main} onClick={remove} className="square">
            <RemoveIcon />
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
      <WizardNavigationControl error={error} nextAction={nextAction} />
    </div>
  );
}
