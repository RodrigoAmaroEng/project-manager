import { initialState, ProjecState } from "../../App.store";
import { AnyAction } from "redux";
import { history } from "../../navigation/history";

export function setProjectName(projectName: string) {
  return { type: "start/set-project-name", payload: projectName };
}

export function createProject() {
  return { type: "start/create-project" };
}

export default function startReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "start/set-project-name": {
      state.project.name = action.payload;
      return state;
    }
    case "start/create-project": {
      state.project.status = ProjecState.new;
      history.push("/p/new")
      return state;
    }
    default:
      return state;
  }
}
