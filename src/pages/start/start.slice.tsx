import { initialState, ProjecState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import { createAsyncThunk } from "@reduxjs/toolkit";

export function setProjectName(projectName: string) {
  return { type: "start/set-project-name", payload: projectName };
}

export function createProject() {
  return { type: "start/create-project" };
}

export function setSelectedProject(project: any) {
  return { type: "start/set-selected-project", payload: project}
}

export function setShowFolders(isActive: boolean = false) {
  return { type: "start/set-show-folders", payload: isActive}
}
export const listFiles = createAsyncThunk(
  "start/files",
  async (service: (arg: string) => void, thunkAPI:any) => {
    if (!thunkAPI.getState().project.fileInfo.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    console.log("First call")
    let files = await service("");
    console.log("Files ", files);
    return files;
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
    case "start/create-project": {
      state.project.status = ProjecState.new;
      history.push("/project/new")
      return state;
    }
    case "start/set-selected-project": {
      state.project.fileInfo.fileName = action.payload.name;
      state.project.fileInfo.fileId = action.payload.id;
      state.project.fileInfo.lastModified = action.payload.modifiedTime;
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
    default:
      return state;
  }
}
