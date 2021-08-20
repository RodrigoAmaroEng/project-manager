import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import "../../extras/extension-functions";
import { RecordList } from "../../extras/extension-functions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveAndFinishWizard = createAsyncThunk(
  "new-project/save-and-finish-wizard",
  async (
    service: (fileName: string, content: string, fileId: string) => void,
    thunkAPI: any
  ) => {
    if (!thunkAPI.getState().context.connector.isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    let project = thunkAPI.getState().project;

    await service(
      project.name,
      JSON.stringify(project),
      project.fileInfo.fileId
    );
  }
);

export default function newProjectReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "new-project/start-wizard": {
      history.push("/project/new/1");
      return state;
    }
    case "new-project/save-and-finish-wizard/fulfilled": {
      history.push("/project/stored");
      return state;
    }
    case "new-project/save-and-finish-wizard/rejected": {
      return { ...state, error: action.error.message };
    }
    default: {
      return state;
    }
  }
}
