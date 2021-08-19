import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import "../../extras/extension-functions";
import { RecordList } from "../../extras/extension-functions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyType } from "../../extras/models";

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

function addToList(list: RecordList, item: any) {
  let newList = RecordList.fromList([...list]);
  newList.add(item);
  return newList;
}

function removeFromList(list: RecordList, item: any) {
  let newList = [...list];
  return RecordList.fromList(newList.remove(item));
}

class EmptyFieldError extends Error {}
class DuplicatedEntry extends Error {}

function includeSimpleRegistry(
  storage: RecordList,
  item: any,
  validationMethod = (item: any) => item.name,
  searchMethod = (target: any, iter: any) => iter.name === target.name
) {
  if (validationMethod(item)) {
    if (!storage.find((it: any) => searchMethod(item, it))) {
      return addToList(storage, item);
    } else {
      throw new DuplicatedEntry();
    }
  } else {
    throw new EmptyFieldError();
  }
}

function buildErrorMessage(error: Error, name: string, type: string): string {
  if (error instanceof DuplicatedEntry)
    return `The ${type} '${name}' already exists`;
  else if (error instanceof EmptyFieldError)
    return `One or more fields were not informed`;
  else return `Could not add the ${type} '${name}'`;
}

export default function newProjectReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "new-project/go-to-step": {
      history.push("/project/new/" + action.payload);
      return state;
    }
    case "new-project/add-terminator": {
      let item = action.payload;
      try {
        state.project.content.terminators = includeSimpleRegistry(
          state.project.content.terminators,
          item
        );
      } catch (e) {
        state.operation.error = buildErrorMessage(e, item.name, "Terminator");
      }
      return state;
    }
    case "new-project/remove-terminator": {
      state.project.content.terminators = removeFromList(
        state.project.content.terminators,
        action.payload
      );
      return state;
    }
    case "new-project/add-operation": {
      let item = action.payload;
      const validation = (item: any) =>
        item.name && item.terminator && item.direction;
      try {
        state.project.content.operations = includeSimpleRegistry(
          state.project.content.operations,
          item,
          validation
        );
      } catch (e) {
        state.operation.error = buildErrorMessage(e, item.name, "Operation");
      }
      return state;
    }
    case "new-project/remove-operation": {
      state.project.content.operations = removeFromList(
        state.project.content.operations,
        action.payload
      );
      return state;
    }
    case "new-project/goto-operation-details": {
      history.push(
        "/project/new/operations/" + state.project.content.operations[0].id
      );
      return state;
    }
    case "new-project/save-operation-details": {
      if (!action.payload.trigger) {
        state.operation.error =
          "You need to specify what triggers this operation.";
        return state;
      }
      if (!action.payload.input) {
        state.operation.error = "You need to name at least the input payload.";
        return state;
      }
      let operations = RecordList.fromList([
        ...state.project.content.operations,
      ]);
      let item = operations.byId(action.payload.id);
      item = Object.assign(item, action.payload);
      let index = operations.findIndex((it) => it.id === action.payload.id);
      if (item.input) {
        state.project.content.payloads = addToList(
          state.project.content.payloads,
          { name: item.input }
        );
        item.input =
          state.project.content.payloads[
            state.project.content.payloads.length - 1
          ].id;
      }
      if (item.output) {
        state.project.content.payloads = addToList(
          state.project.content.payloads,
          { name: item.output }
        );
        item.output =
          state.project.content.payloads[
            state.project.content.payloads.length - 1
          ].id;
      }
      state.project.content.operations[index] = item;
      if (index + 1 == operations.length) history.push("/project/new/4");
      else history.push("/project/new/operations/" + operations[index + 1].id);
      return state;
    }
    case "new-project/add-entity": {
      let item = action.payload;
      try {
        state.project.content.entities = includeSimpleRegistry(
          state.project.content.entities,
          item
        );
      } catch (e) {
        state.operation.error = buildErrorMessage(e, item.name, "Entity");
      }
      return state;
    }
    case "new-project/remove-entity": {
      state.project.content.entities = removeFromList(
        state.project.content.entities,
        action.payload
      );
      return state;
    }
    case "new-project/goto-entity-properties": {
      history.push(
        "/project/new/entities/" + state.project.content.entities[0].id
      );
      return state;
    }
    case "new-project/add-entity-property": {
      let item = action.payload;
      let entity = RecordList.fromList([
        ...state.project.content.entities,
      ]).byId(action.payload.entityId);
      let properties = entity.properties || [];
      try {
        entity.properties = includeSimpleRegistry(properties, item);
      } catch (e) {
        state.operation.error = buildErrorMessage(
          e,
          item.name,
          "entity property"
        );
      }

      return state;
    }
    case "new-project/remove-entity-property": {
      let item = action.payload.item;
      let entity = RecordList.fromList([
        ...state.project.content.entities,
      ]).byId(action.payload.entityId);
      let index = state.project.content.entities.findIndex(
        (it) => it.id === action.payload.entityId
      );
      entity.properties = removeFromList(entity.properties, item);
      state.project.content.entities[index] = entity;
      return state;
    }
    case "new-project/add-payload-entity-property": {
      let item = action.payload;
      let payload = RecordList.fromList([
        ...state.project.content.payloads,
      ]).byId(action.payload.payloadId);
      let properties = payload.properties || [];
      try {
        item.kind = PropertyType.EntityProperty;
        payload.properties = includeSimpleRegistry(
          properties,
          item,
          (item) => item.name && item.type,
          (target, iter) =>
            iter.entityId === target.entity.id &&
            iter.propertyId === target.property.id
        );
      } catch (e) {
        state.operation.error = buildErrorMessage(
          e,
          item.name,
          "selected property"
        );
      }
      return state;
    }
    case "new-project/add-payload-new-property": {
      let item = action.payload;
      let payload = RecordList.fromList([
        ...state.project.content.payloads,
      ]).byId(action.payload.payloadId);
      let properties = payload.properties || [];
      try {
        item.kind = PropertyType.Variable;
        payload.properties = includeSimpleRegistry(
          properties,
          item,
          (item) => item.name && item.type
        );
      } catch (e) {
        state.operation.error = buildErrorMessage(
          e,
          item.name,
          "payload property"
        );
      }
      return state;
    }
    case "new-project/remove-payload-property": {
      let item = action.payload.item;
      let payload = RecordList.fromList([
        ...state.project.content.payloads,
      ]).byId(action.payload.payloadId);
      let index = state.project.content.payloads.findIndex(
        (it) => it.id === action.payload.payloadId
      );
      payload.properties = removeFromList(payload.properties, item);
      state.project.content.payloads[index] = payload;
      return state;
    }
    case "new-project/goto-payload-properties": {
      history.push(
        "/project/new/payloads/" + state.project.content.payloads[0].id
      );
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
