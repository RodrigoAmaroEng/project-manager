import { createAsyncThunk } from "@reduxjs/toolkit";

export function navigateTo(payload: string) {
  return { type: "menu/navigate-to", payload };
}
export function viewRecord(id: number) {
  return { type: "crud/view-record", payload: id };
}
export function editRecord(id: number) {
  return { type: "crud/edit-record", payload: id };
}
export function deleteRecord(type: string, item: any) {
  return { type: "crud/remove-" + type.toLowerCase(), payload: item };
}
export function cancelOperation() {
  return { type: "crud/cancel", payload: window.location.pathname };
}

export function addSimpleRecord(type: string, name: string) {
  return { type: `crud/add-simple-${type}`, payload: { name } };
}

export const saveProject = createAsyncThunk(
  "menu/update-file",
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