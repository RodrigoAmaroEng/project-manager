import { initialState } from "../../App.store";
import { AnyAction } from "redux";
import history from "../../navigation/history";
import "../../extras/extension-functions";
import { RecordList } from "../../extras/extension-functions";

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
      let operations = RecordList.fromList([...state.project.content.operations]);
      let item = operations.byId(action.payload.id);
      item = Object.assign(item, action.payload);
      let index = operations.findIndex((it) => it.id === action.payload.id);
      if (item.input) {
        state.project.content.payloads = addToList(state.project.content.payloads, { name: item.input })
        item.input = state.project.content.payloads[state.project.content.payloads.length - 1].id
      }
      if (item.output) {
        state.project.content.payloads = addToList(state.project.content.payloads, { name: item.output })
        item.output = state.project.content.payloads[state.project.content.payloads.length - 1].id
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

    default: {
      return state;
    }
  }
}
