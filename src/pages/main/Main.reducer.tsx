import { putMessage } from "../../App.actions";
import { initialState } from "../../App.store";
import history from "../../navigation/history";

export default function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case "menu/navigate-to": {
      history.push("/project/stored/" + action.payload);
      return state;
    }
    case "crud/edit-record": {
      history.push(window.location.pathname + "/edit/" + action.payload);
      return state;
    }
    case "crud/cancel": {
      history.push(action.payload.split("/").slice(0, 4).join("/"));
      return state;
    }
    case "menu/update-file/pending": {
      action.asyncDispatch(putMessage("Uploading file..."))
      return state
    }
    case "menu/update-file/fulfilled": {
      action.asyncDispatch(putMessage("File saved successfully"))
      return state
    }
    case "menu/update-file/rejected": {
      return { ...state, error: action.error.message };
    }
    default: {
      return state;
    }
  }
}
