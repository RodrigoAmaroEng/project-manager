import { useSelector } from "react-redux";
import Menu, { MenuItem } from "../../components/Menu";
import "./Main.page.css";

export default function MainPage(props: any) {

  const terminatorsCount = useSelector((state:any) => state.project.content.terminators.length)
  const operationsCount = useSelector((state:any) => state.project.content.operations.length)
  const entitiesCount = useSelector((state:any) => state.project.content.entities.length)
  const payloadsCount = useSelector((state:any) => state.project.content.payloads.length)


  return (
    <div className="main-structure">
      <header></header>
      <aside>
        <Menu>
          <MenuItem name="Terminators" count={terminatorsCount} />
          <MenuItem name="Operations" count={operationsCount} />
          <MenuItem name="Entities" count={entitiesCount} />
          <MenuItem name="Payloads" count={payloadsCount} />
        </Menu>
      </aside>
      <article>

      </article>
    </div>
  );
}
