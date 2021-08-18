import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import "../../extras/extension-functions";
import { RecordList } from "../../extras/extension-functions";
import { stat } from "fs";

function addToList(list: RecordList, item: any) {
  let newList = RecordList.fromList([...list]);
  newList.add(item);
  return newList;
}

function removeFromList(list: RecordList, item: any) {
  let newList = [...list];
  return RecordList.fromList(newList.remove(item));
}

export default function newProjectReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "new-project/go-to-step": {
      console.log(action.payload);
      history.push("/project/new/" + action.payload);
      return state;
    }
    case "new-project/add-terminator": {
      let item = action.payload;
      if (item.name) {
        let terminators = state.project.content.terminators;
        if (!terminators.find((it: any) => it.name === item.name)) {
          state.project.content.terminators = addToList(
            state.project.content.terminators,
            item
          );
        } else {
          state.operation.error = `The terminator '${item.name}' already exists`;
        }
      } else {
        state.operation.error = "Terminator name cannot be empty";
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
      if (item.name && item.terminator && item.direction) {
        let terminators = state.project.content.operations;
        if (!terminators.find((it: any) => it.name === item.name)) {
          state.project.content.operations = addToList(
            state.project.content.operations,
            item
          );
        } else {
          state.operation.error = `The terminator '${item.name}' already exists`;
        }
      } else {
        state.operation.error = "One or more informations were not provided";
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
      if (item.name) {
        let entities = state.project.content.entities;
        if (!entities.find((it: any) => it.name === item.name)) {
          state.project.content.entities = addToList(
            state.project.content.entities,
            item
          );
        } else {
          state.operation.error = `The entity '${item.name}' already exists`;
        }
      } else {
        state.operation.error = "Entity name cannot be empty";
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
      if (item.name) {
        let entity = RecordList.fromList([
          ...state.project.content.entities,
        ]).byId(action.payload.entityId);
        let properties = entity.properties || [];
        if (!properties.find((it: any) => it.name === item.name)) {
          properties = addToList(properties, {
            name: item.name,
            type: item.type,
          });
          entity.properties = properties;
        } else {
          state.operation.error = `The entity property '${item.name}' already exists`;
        }
      } else {
        state.operation.error = "Entity property name cannot be empty";
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
      if (item.entity && item.property) {
        let payload = RecordList.fromList([
          ...state.project.content.payloads,
        ]).byId(action.payload.payloadId);
        let properties = payload.properties || [];
        if (!properties.find((it: any) => it.entityId === item.entity.id && it.propertyId === item.property.id)) {
          properties = addToList(properties, {
            kind: "entity",
            entityId: item.entity.id,
            propertyId: item.property.id,
          });
          payload.properties = properties;
        } else {
          state.operation.error = `The selected property is already part of this payload`;
        }
      } else {
        state.operation.error = "One or more fields were not informed";
      }
      return state;
    }
    case "new-project/add-payload-new-property": {
      let item = action.payload;
      if (item.name && item.type) {
        let payload = RecordList.fromList([
          ...state.project.content.payloads,
        ]).byId(action.payload.payloadId);
        let properties = payload.properties || [];
        if (!properties.find((it: any) => it.name === item.name)) {
          properties = addToList(properties, {
            kind: "variable",
            name: item.name,
            type: item.type,
          });
          payload.properties = properties;
        } else {
          state.operation.error = `The payload property '${item.name}' already exists`;
        }
      } else {
        state.operation.error = "One or more fields were not informed";
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
    default: {
      return state;
    }
  }
}
