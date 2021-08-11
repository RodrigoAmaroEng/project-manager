import CButton, { ButtonType } from "../components/Button";
import Circle from "../components/Circle";
import DropDown from "../components/DropDown";
import Field from "../components/Field";
import List, { ListStyle, Row } from "../components/List";
import ModalWindow from "../components/Modal";
import { Radio, RadioGroup } from "../components/Radio";
import StaticField from "../components/StaticField";
import { Tab, TabLayout } from "../components/TabLayout";
import { SpaceH, SpaceV } from "../components/Utils";

export default function StartPage() {
  return (
    <ModalWindow>
      <h1>Project modeler</h1>
      <TabLayout>
        <Tab title="New Project">
          <Field placeholder="Project name" />
          <RadioGroup>
            <Radio title="Entity property" value="ENTITY" />
            <Radio title="New property" value="PROPERTY" />
          </RadioGroup>
          <DropDown />
        </Tab>
        <Tab title="Load Project">
          <List listStyle={ListStyle.SingleSelect}>
            <Row>
              <Circle>P</Circle>
              <span className="col-expand hspace">Projeto 1</span>
              <StaticField label="Last update" value="2020/03/06 - 07:00" />
            </Row>
            <Row>
              <Circle>P</Circle>
              <span className="col-expand hspace">Projeto 2</span>
              <StaticField label="Last update" value="2020/03/06 - 07:00" />
            </Row>
          </List>
          <SpaceV />
          <CButton onClick={() => {}} type={ButtonType.secondary}>
            Cancel
          </CButton>
          <SpaceH />
          <CButton onClick={() => {}} type={ButtonType.main}>
            Create
          </CButton>
        </Tab>
      </TabLayout>
    </ModalWindow>
  );
}
