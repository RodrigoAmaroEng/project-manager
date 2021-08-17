import "./StaticField.css"

export default function StaticField(props: any) {
  return (
    <div className={`static-field ${props.className}`}>
      <span className="label">{props.label}</span>
      <span className="value">{props.value}</span>
    </div>
  );
}
