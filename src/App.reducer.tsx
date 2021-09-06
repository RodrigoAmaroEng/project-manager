import { initialState } from "./App.store";
import { AnyAction } from "redux";
import { GDriveApiInstance } from "./extras/gdrive-api";

export default function appReducer(state: any, action: AnyAction) {
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
      return state;
    }
    case "app/dismiss-error": {
      state.operation.error = "";
      return state;
    }
    case "app/delete-existing-project": {
      window.sessionStorage.clear();
      return initialState;
    }
    case "app/fields-were-cleared": {
      state.operation.clearFields = false;
      state.operation.lastOperation = "";
      return state;
    }
    case "app/put-message": {
      if (state.operation.messageHandler) {
        clearTimeout(state.operation.messageHandler);
      }
      state.operation.message = action.payload;
      state.operation.messageHandler = setTimeout(
        () => action.asyncDispatch({ type: "app/clear-message" }),
        3000
      );
      return state;
    }
    case "app/clear-message": {
      state.operation.message = "";
      clearTimeout(state.operation.messageHandler);
      state.operation.messageHandler = undefined;
      return state;
    }
    case "app/ask-before-run": {
      state.operation.waitingToConfirm = action.payload;
      return state;
    }
    case "app/answer-yes": {
      action.asyncDispatch(state.operation.waitingToConfirm?.action);
      state.operation.waitingToConfirm = undefined;
      return state;
    }
    case "app/answer-no": {
      state.operation.waitingToConfirm = undefined;
      return state;
    }
    default: {
      return state;
    }
  }
}
