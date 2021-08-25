import { initialState } from "../../App.store";
import {
  buildErrorMessage,
  includeSimpleRegistry,
  removeFromList,
} from "../../extras/crud-operations";
import { RecordList } from "../../extras/extension-functions";
import history from "../../navigation/history";

export default function entityReducer(state = initialState, action: any) {
  switch (action.type) {
    case "crud/add-entity": {
      let item = action.payload;
      try {
        state.project.content.entities = includeSimpleRegistry(
          state.project.content.entities,
          item
        );
        state.operation.clearFields = true;
      } catch (e) {
        state.operation.error = buildErrorMessage(e, item.name, "Entity");
      }
      return state;
    }
    case "crud/remove-entity": {
      state.project.content.entities = removeFromList(
        state.project.content.entities,
        action.payload
      );
      return state;
    }
    case "new-project/finish-entity": {
      if (state.project.content.entities.length > 0) {
        history.push(
          "/project/new/entities/" + state.project.content.entities[0].id
        );
      } else {
        state.operation.error = "You need to add at least one Entity";
      }
      return state;
    }
    case "crud/add-entity-property": {
      let item = action.payload;
      let entity = RecordList.fromList([
        ...state.project.content.entities,
      ]).byId(action.payload.entityId);
      let properties = entity.properties || [];
      try {
        entity.properties = includeSimpleRegistry(properties, item);
        state.operation.clearFields = true;
      } catch (e) {
        state.operation.error = buildErrorMessage(
          e,
          item.name,
          "entity property"
        );
      }

      return state;
    }
    case "crud/remove-entity-property": {
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
    case "new-project/finish-entity-properties": {
      let entities = state.project.content.entities as any[];
      let index = entities.findIndex(
        (it: any) => it.id === action.payload.entityId
      );
      if (entities[index].properties?.length > 0) {
        if (index + 1 == entities.length)
          history.push(
            "/project/new/payloads/" + state.project.content.payloads[0].id
          );
        else history.push("/project/new/entities/" + entities[index + 1].id);
      } else {
        state.operation.error = "An Entity must have at least one property";
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
