import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import "../../extras/extension-functions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecordList } from "../../extras/extension-functions";

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

    return await service(
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
      state.project.fileInfo.fileId = action.payload.id;
      history.push("/project/stored/home");
      return state;
    }
    case "new-project/save-and-finish-wizard/rejected": {
      return { ...state, error: action.error.message };
    }
    case "new-project/go-to-next-payload": {
      let payloads = RecordList.fromList( state.project.content.payloads);
      let index = payloads.findIndex(
        (it) => String(it.id) === String(action.payload.id)
      );
      if (index + 1 == payloads.length) {
        action.asyncDispatch(saveAndFinishWizard(action.payload.service));
      } else history.push("/project/new/payloads/" + payloads[index + 1].id);
      return state;
    }
    default: {
      return state;
    }
  }
}
