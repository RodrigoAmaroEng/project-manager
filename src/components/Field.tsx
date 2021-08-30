
import { useRef } from "react";
import "./Field.css";

export default function Field(props: any) {
  const inputRef : any = useRef(null)
  let className = `field-wrap${inputRef.current?.value ? " filled" : ""} ${props.className ?? ""}`
  return (
    <span className={className} placeholder={props.placeholder}>
      <input
        className={`field fill-space`}
        type="text"
        ref={inputRef}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
      />
    </span>
  );
}
