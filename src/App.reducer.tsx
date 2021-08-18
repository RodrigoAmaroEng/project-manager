import { initialState } from "./App.store";
import { AnyAction } from "redux";
import { GDriveApiInstance } from "./extras/gdrive-api";

export default function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "app/set-authenticated-user": {
      state.project.fileInfo.connector.isAuthenticated = true;
      state.project.fileInfo.connector.user = action.payload;
      return state;
    }
    case "app/set-gdrive-initialized": {
      state.project.fileInfo.connector.isLoading = false;
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
      console.log("Delete existing project")
      return initialState;
    }
    default: {
      return state;
    }
  }
}
