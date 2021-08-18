import { initialState } from "./App.store";
import { AnyAction } from "redux";
import { GDriveApiInstance } from "./extras/gdrive-api";

export default function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "app/set-authenticated-user": {
      state.context.connector.isAuthenticated = true;
      state.context.connector.user = action.payload;
      return state;
    }
    case "app/set-gdrive-initialized": {
      state.context.connector.isLoading = false;
      return state;
    }
    case "app/authenticate": {
      GDriveApiInstance.signIn();
      return state
    }
    case "app/dismiss-error": {
      state.operation.error = "";
      return state
    }
    case "app/delete-existing-project": {
      window.sessionStorage.clear();
      return initialState;
    }
    default: {
      return state;
    }
  }
}
