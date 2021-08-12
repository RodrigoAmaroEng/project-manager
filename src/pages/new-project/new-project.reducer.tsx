import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import { history } from "../../navigation/history";
import "../../extras/extension-functions";

export default function newProjectReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "new-project/go-to-step": {
      history.push("/project/new/" + action.payload);
      return state;
    }
    case "new-project/add-terminator": {
      if (action.payload) {
        let terminators = state.project.content.terminators;
        if (!terminators.contains(action.payload)) {
          let value = [...state.project.content.terminators, action.payload];
          state.project.content.terminators = value;
        } else {
          state.operation.error = `The terminator '${action.payload}' already exists`;
        }
      } else {
        state.operation.error = "Terminator name cannot be empty";
      }
      return state;
    }
    case "new-project/remove-terminator": {
      let value = [...state.project.content.terminators];
      state.project.content.terminators = value.remove(action.payload);
      return state;
    }
    default: {
      return state;
    }
  }
}
