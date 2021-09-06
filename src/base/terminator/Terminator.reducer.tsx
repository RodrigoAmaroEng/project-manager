import {
  buildErrorMessage,
  includeSimpleRegistry,
  removeFromList,
} from "../../extras/crud-operations";
import history from "../../navigation/history";

export default function terminatorReducer(state: any, action: any) {
  switch (action.type) {
    case "crud/add-simple-terminator":
    case "crud/add-terminator": {
      let item = action.payload ?? {};
      try {
        state.project.content.terminators = includeSimpleRegistry(
          state.project.content.terminators,
          item
        );
        state.operation.clearFields = true;
      } catch (e: any) {
        state.operation.error = buildErrorMessage(e, item.name, "Terminator");
      }
      return state;
    }
    case "crud/remove-terminator": {
      state.project.content.terminators = removeFromList(
        state.project.content.terminators,
        action.payload
      );
      return state;
    }
    case "new-project/finish-terminator": {
      if (state.project.content.terminators.length > 0) {
        history.push("/project/new/2");
      } else {
        state.operation.error = "You need to add at least one Terminator";
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
