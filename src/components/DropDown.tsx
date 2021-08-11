import { useState } from "react"
import "./DropDown.css"

export default function DropDown(props: any) {
  const [isOpen, setOpen] = useState(false)
  return <div className={`dropdown ${isOpen ? "open" : ""}`} onClick={() => setOpen(!isOpen)}>

  </div>
}