import "./Field.css"

export default function Field(props: any) {
  return <input className="field" type="text" value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder}/>
}