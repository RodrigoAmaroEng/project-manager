import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import startReducer from "./pages/start/start.slice";
import { AnyAction } from "redux";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export enum ProjecState {
  undefined,
  new,
  loaded,
}

export enum ConnectorProvider {
  gdrive
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
        isAuthenticated: false,
        user: undefined,
        files: []
      }
    },
    content: {
      needsToSave: false,
    },
  },
};

export const store = createStore((state = initialState, action: AnyAction) => {
  return [startReducer].reduce((a, s: Function) => s(a, action), state);
}, composedEnhancer);
