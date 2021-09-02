import { useSelector } from "react-redux";
import { Flowchart } from "./Flowchart";

export function Chart(props: any) {
  const startAscii = 65;
  const terminators = useSelector(
    (state: any) => state.project.content.terminators
  );
  const operations = useSelector(
    (state: any) => state.project.content.operations
  );
  const projectName = useSelector((state: any) => state.project.name);
  let definition = "graph LR; ";
  let usedIndex = 0;
  let map: any = {};
  terminators.forEach((t: any) => {
    map[t.id] = String.fromCharCode(startAscii + usedIndex);
    definition += map[t.id] + `[${t.name}];`;
    usedIndex++;
  });
  const systemChar = String.fromCharCode(startAscii + usedIndex);
  definition += systemChar + `((${projectName}));`;
  operations.forEach((o: any) => {
    definition += `${map[o.terminatorId]}-- ${o.name} -->${systemChar};`;
  });
  return <Flowchart type="mermaid" value={definition} />;
}
