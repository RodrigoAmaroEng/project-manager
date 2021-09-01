import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import { createAsyncThunk } from "@reduxjs/toolkit";

export function setProjectName(projectName: string) {
  return { type: "start/set-project-name", payload: projectName };
}

export function setSelectedProject(project: any) {
  return { type: "start/set-selected-project", payload: project };
}

export function chooseFolder() {
  return { type: "start/choose-folder" };
}

export function setShowFolders(isActive: boolean = false) {
  return { type: "start/set-show-folders", payload: isActive };
}

export function openFolder(folder: any, service: (arg?: string) => void) {
  return { type: "start/open-folder", payload: { folder, service } };
}

export function selectFolder(folder: any) {
  return { type: "start/select-folder", payload: folder };
}

export function backToParentFolder(service: (arg?: string) => void) {
  return { type: "start/back-to-parent-folder", payload: service };
}

export const listFiles = createAsyncThunk(
  "start/files",
  async (service: (arg?: string) => void, thunkAPI: any) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let files = await service(
      thunkAPI.getState().start.files.selectedFolder.id
    );
    return files;
  }
);

export const createProject = createAsyncThunk(
  "start/store-project",
  async (
    service: (fileName: string, content: string, fileId: string, folderId: string) => any,
    thunkAPI: any
  ) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let project = thunkAPI.getState().project;
    let fileInfo = await service(
      project.name,
      JSON.stringify(project),
      project.fileInfo.fileId,
      thunkAPI.getState().start.files.selectedFolder.id
    );
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

export const loadProjectToWizard = createAsyncThunk(
  "start/load-project-to-wizard",
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
    case "start/choose-folder": {
      state.start.files.folderSelectionOpen = true;
      return state;
    }
    case "start/back-to-parent-folder": {
      state.start.files.selectedFolder =
        state.start.files.selectedFolder.parent;
      action.asyncDispatch(listFiles(action.payload));
      return state;
    }
    case "start/select-folder": {
      console.log(action.payload.item);
      state.start.files.selectedFolder = {
        ...action.payload.item.props.item,
        parent: state.start.files.selectedFolder,
      };
      state.start.files.folderSelectionOpen = false;
      return state;
    }
    case "start/open-folder": {
      console.log(action.type);
      state.start.files.selectedFolder = {
        ...action.payload.folder,
        parent: state.start.files.selectedFolder,
      };
      action.asyncDispatch(listFiles(action.payload.service));
      return state;
    }
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
      setTimeout(() => history.push("/project/stored"), 1000);
      return state;
    }
    case "start/load-project-to-wizard/pending":
    case "start/load-project/pending": {
      state.start.files.isLoading = true;
      return state;
    }
    case "start/load-project-to-wizard/rejected":
    case "start/load-project/rejected": {
      state.start.files.isLoading = false;
      return { ...state, error: action.error.message };
    }
    case "start/load-project-to-wizard/fulfilled": {
      state.start.files.isLoading = false;
      state.project = JSON.parse(action.payload.body);
      history.push("/project/new");
      return state;
    }
    default:
      return state;
  }
}
