import { FieldType, SourceType } from "../extras/models";
import { MainButton } from "./Button";
import { Line, SpaceFill } from "./Utils";
import "./Viewer.css";
const filterVisibleFields = (item: any, fields: any) =>
  Object.entries(fields).filter(
    ([key, value]: any) => value.type !== FieldType.identifier
  );

enum EntryType {
  record,
  listItem,
}

export default function Viewer(props: any) {
  const fields: any[] = filterVisibleFields(
    props.item,
    props.object._meta.fields
  );
  const entryType: EntryType = props.entryType ?? EntryType.record;
  const direction = entryType === EntryType.record ? "flex-col" : "flex-row";

  const renderProperty = (name: string, meta: any) => (
    <div className={EntryType.listItem === entryType ? "half table-cell" : ""}>
      {EntryType.listItem === entryType ? (
        ""
      ) : (
        <h6 className="title">{meta.label ?? name}:</h6>
      )}
      {meta.sourceType === SourceType.list ? (
        <span className="content">
          {props.item?.[name]
            ? props.onQueryItem?.(props.item?.[name], meta.source._meta.tag)
                ?.name
            : "---"}
        </span>
      ) : meta.type === FieldType.smartInput ? (
        <span
          className="content"
          dangerouslySetInnerHTML={{
            __html: props.item?.[name] ? props.item?.[name] : "---",
          }}
        ></span>
      ) : (
        <span className="content">{props.item?.[name] ?? "---"}</span>
      )}
    </div>
  );
  const renderList = (name: string, meta: any) => (
    <div className="flex-col viewer-list">
      <h6 className="title">{name}:</h6>
      <div className="flex-row">
        {filterVisibleFields(props.item?.[name], meta.kind._meta.fields).map(
          ([key, value]: any) => (
            <div className="half title table-head">{key}</div>
          )
        )}
      </div>
      {props.item?.[name]?.map((it: any) => (
        <Viewer
          item={it}
          object={meta.kind}
          entryType={EntryType.listItem}
          onQueryItem={props.onQueryItem}
        />
      ))}
    </div>
  );
  return (
    <div className={`viewer-control fill-space ${direction}`}>
      {entryType === EntryType.record ? <h1>{props.object.name}</h1> : ""}
      {fields.map(([key, value]: any) =>
        value.type === FieldType.list
          ? renderList(key, value)
          : renderProperty(key, value)
      )}
      <SpaceFill />
      {entryType === EntryType.record ? (
        <Line className="line-align-right">
          <MainButton onClick={props.onCancel}>Close</MainButton>
        </Line>
      ) : (
        ""
      )}
    </div>
  );
}
