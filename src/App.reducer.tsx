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
    case "app/authenticate": {
      GDriveApiInstance.signIn();
      return state
    }
    default: {
      return state;
    }
  }
}
