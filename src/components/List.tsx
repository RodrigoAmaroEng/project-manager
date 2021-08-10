import "./List.css";

export function Row(props: any) {
  return <div className="row-content">{props.children}</div>;
}

export default function List(props: any) {
  const mapChildren = () => {
    if (props.children.length > 1) {
      return props.children
        .filter((row: any) => row.type.name === "Row")
        .map((row: any) => <div className="row">{row}</div>);
    } else if (props.children.type.name === "Row") {
      return <div className="row">{props.children}</div>
    } else {
      return
    }
  };

  return <div className="list-container">{props.children && mapChildren()}</div>;
}
