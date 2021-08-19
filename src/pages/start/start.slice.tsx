import { initialState, ProjecState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import { createAsyncThunk } from "@reduxjs/toolkit";

export function setProjectName(projectName: string) {
  return { type: "start/set-project-name", payload: projectName };
}

export function setSelectedProject(project: any) {
  return { type: "start/set-selected-project", payload: project };
}

export function setShowFolders(isActive: boolean = false) {
  return { type: "start/set-show-folders", payload: isActive };
}
export const listFiles = createAsyncThunk(
  "start/files",
  async (service: (arg: string) => void, thunkAPI: any) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let files = await service("");
    return files;
  }
);

export const createProject = createAsyncThunk(
  "start/store-project",
  async (service: (fileName: string, content: string, fileId: string) => any, thunkAPI: any) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let project = thunkAPI.getState().project
    let fileInfo = await service(project.name, JSON.stringify(project), project.fileInfo.fileId);
    return fileInfo;
  }
);

export const loadProjectFromStorage = createAsyncThunk(
  "start/load-project",
  async (service: (fileId: string) => void, thunkAPI: any) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let fileContent = await service(thunkAPI.getState().start.selectedFileId);
    return fileContent;
  }
);

export default function startReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "start/set-project-name": {
      state.project.name = action.payload;
      return state;
    }
    case "start/set-show-folders": {
      state.start.files.showFolders = action.payload;
      return state;
    }
    case "start/store-project/fulfilled": {
      state.project.fileInfo.fileId = action.payload.id;
      state.project.fileInfo.fileName = action.payload.name;
      history.push("/project/new");
      return state;
    }
    case "start/store-project/rejected": {
      return { ...state, error: action.error.message };
    }
    case "start/set-selected-project": {
      state.start.selectedFileId = action.payload.id;
      return state;
    }
    case "start/files/fulfilled": {
      state.start.files.isLoading = false;
      state.start.files.list = action.payload;
      return state;
    }
    case "start/files/pending": {
      state.start.files.isLoading = true;
      state.start.files.list = [];
      return state;
    }
    case "start/files/rejected": {
      state.start.files.isLoading = false;
      state.start.files.list = [];
      return { ...state, error: action.error.message };
    }

    case "start/load-project/fulfilled": {
      state.start.files.isLoading = false;
      state.project = JSON.parse(action.payload.body);
      history.push("/project/stored");
      return state;
    }
    case "start/load-project/pending": {
      state.start.files.isLoading = true;
      return state;
    }
    case "start/load-project/rejected": {
      state.start.files.isLoading = false;
      return { ...state, error: action.error.message };
    }
    default:
      return state;
  }
}
