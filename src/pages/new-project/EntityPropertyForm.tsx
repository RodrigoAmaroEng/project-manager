import { useSelector } from "react-redux";
import DropDown, { Option, RenderList } from "../../components/DropDown";
import { Line, SpaceH } from "../../components/Utils";
import { RecordList } from "../../extras/extension-functions";

export function EntityPropertyForm(props: any) {
  const entities = useSelector((state: any) => RecordList.fromList(state.project.content.entities)
  );

  const properties = RecordList.fromList(props.value?.entity?.properties || []);

  return (
    <Line className="fill-space">
      <DropDown
        onSelect={(item: any) => props.onChange(Object.assign(props.value || {}, { entity: item }))}
        onRender={(item: any) => item.name}
        placeholder="Entity"
        selected={props.value?.entity}
        className="half"
      >
        <RenderList items={entities} displayProperty="name"/>
      </DropDown>
      <SpaceH />
      <DropDown
        onSelect={(item: any) => props.onChange(Object.assign(props.value || {}, { property: item }))}
        selected={props.value?.property}
        placeholder="Property"
        onRender={(item: any) => item.name}
        className="half"
      >
        <RenderList items={properties} displayProperty="name"/>
      </DropDown>
    </Line>
  );
}
