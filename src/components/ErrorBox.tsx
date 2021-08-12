import { useEffect } from "react";
import "./ErrorBox.css";

export default function ErrorBox(props: any) {
  let visible =  props.visible ? "" : " animated-hidden";
  useEffect(() => {
    if (props.visible && props.onDismiss) {
      setTimeout(props.onDismiss, 3000);
    }
  }, [props.visible]);
  return (
    <div className={`error-box${visible}`}>
      <div className="error-mark"></div>
      <div className="error-content">{props.children}</div>
    </div>
  );
}
