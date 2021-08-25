import { initialState } from "../../App.store";
import {
  buildErrorMessage,
  includeSimpleRegistry,
  removeFromList,
} from "../../extras/crud-operations";
import { RecordList } from "../../extras/extension-functions";
import { PropertyType } from "../../extras/models";

export default function payloadReducer(state = initialState, action: any) {
  switch (action.type) {
    case "new-project/add-payload-entity-property": {
      let item = action.payload;
      let name = item.propertyName;
      delete item.propertyName;
      let payload = RecordList.fromList([
        ...state.project.content.payloads,
      ]).byId(action.payload.payloadId);
      let properties = payload.properties || [];
      try {
        item.kind = PropertyType.EntityProperty;
        payload.properties = includeSimpleRegistry(
          properties,
          item,
          (item) => item.entityId && item.propertyId,
          (target, iter) =>
            iter.entityId === target.entityId &&
            iter.propertyId === target.propertyId
        );
        state.operation.clearFields = true;
      } catch (e) {
        state.operation.error = buildErrorMessage(e, name, "selected property");
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
        state.operation.clearFields = true;
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
        (it: any) => it.id === action.payload.payloadId
      );
      payload.properties = removeFromList(payload.properties, item);
      state.project.content.payloads[index] = payload;
      return state;
    }
    case "new-project/add-payload": {
      let item = action.payload;
      let name = item.propertyName;
      try {
        item.kind = PropertyType.EntityProperty;
        state.project.content.payloads = includeSimpleRegistry(
          state.project.content.payloads,
          item
        );
        state.operation.clearFields = true;
      } catch (e) {
        state.operation.error = buildErrorMessage(e, name, "selected property");
      }
      return state;
    }
    case "form/remove-payload": {
      console.log(action)
      state.project.content.payloads = removeFromList(
        state.project.content.payloads,
        action.payload
      );
      return state;
    }

    default: {
      return state;
    }
  }
}
