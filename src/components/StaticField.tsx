import "./StaticField.css"

export default function StaticField(props: any) {
  return (
    <div className="static-field">
      <span className="label">{props.label}</span>
      <span className="value">{props.value}</span>
    </div>
  );
}
