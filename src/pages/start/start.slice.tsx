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

export const listFiles = createAsyncThunk(
  "start/files",
  async (service: (arg: string) => void, thunkAPI:any) => {
    if (!thunkAPI.getState().project.fileInfo.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    return service("");
  }
);



export default function startReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case "start/set-project-name": {
      state.project.name = action.payload;
      return state;
    }
    case "start/create-project": {
      state.project.status = ProjecState.new;
      history.push("/p/new")
      return state;
    }
    case "start/set-selected-project": {
      state.project.fileInfo.fileName = action.payload.name;
      state.project.fileInfo.fileId = action.payload.id;
      state.project.fileInfo.lastModified = action.payload.modifiedTime;
      return state;
    }
    case "start/files/fulfilled": {
      state.project.fileInfo.connector.files = action.payload;
      return state;
    }
    case "start/files/rejected": {
      return { ...state, error: action.error.message };
    }
    default:
      return state;
  }
}
