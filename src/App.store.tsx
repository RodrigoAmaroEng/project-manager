import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import startReducer from "./pages/start/start.slice";
import appReducer from "./App.reducer";
import { AnyAction } from "redux";
import newProjectReducer from "./pages/new-project/new-project.reducer";
import "./extras/extension-functions.tsx";
import { RecordList } from "./extras/extension-functions";
import terminatorReducer from "./base/terminator/Terminator.reducer";
import operationReducer from "./base/operation/Operation.reducer";
import entityReducer from "./base/entity/Entity.reducer";
import payloadReducer from "./base/payload/Payload.reducer";
import mainReducer from "./pages/main/Main.reducer";
import asyncDispatchMiddleware from "./extras/async-dispatcher";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, asyncDispatchMiddleware));

export enum ProjecState {
  undefined,
  new,
  loaded,
}

export enum ConnectorProvider {
  gdrive,
}

export const initialState = {
  project: {
    name: undefined,
    status: ProjecState.undefined,
    fileInfo: {
      fileName: undefined,
      fileId: undefined,
      lastModified: undefined,
      connector: {
        provider: ConnectorProvider.gdrive,
      },
    },
    content: {
      terminators: new RecordList(),
      operations: new RecordList(),
      payloads: new RecordList(),
      entities: new RecordList(),
      needsToSave: false,
    },
  },
  operation: {
    error: "",
    message: "",
    messageHandler: undefined as any,
    lastOperation: "",
    clearFields: false,
  },
  context: {
    connector: {
      provider: ConnectorProvider.gdrive,
      isLoading: true,
      isAuthenticated: false,
      user: undefined,
    },
  },
  start: {
    selectedFileId: undefined,
    files: {
      list: [],
      isLoading: true,
      showFolders: false,
    },
  },
};

export const store = createStore((state = initialState, action: AnyAction) => {
  let storeState = window.sessionStorage.getItem("state");
  if (initialState.project.name === undefined && storeState) {
    state = JSON.parse(window.sessionStorage.getItem("state") || "");
  }
  let newState: any = [
    startReducer,
    appReducer,
    newProjectReducer,
    terminatorReducer,
    operationReducer,
    entityReducer,
    payloadReducer,
    mainReducer
  ].reduce((a, s: Function) => s(a, action), state);
  window.sessionStorage.setItem("state", JSON.stringify(newState));
  newState.operation.lastOperation = action.type
  return newState;
}, composedEnhancer);
