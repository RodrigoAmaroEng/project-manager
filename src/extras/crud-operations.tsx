import { RecordList } from "./extension-functions";
import { DuplicatedEntry, EmptyFieldError, EntryIdNotFound } from "./models";

export function addToList(list: RecordList, item: any) {
  let newList = RecordList.fromList([...list]);
  newList.add(item);
  return newList;
}

export function updateList(list: RecordList, item: any) {
  let newList = RecordList.fromList([...list]);
  let existingItem = newList.byId(item.id);
  if (!existingItem) {
    throw new EntryIdNotFound(item.id);
  }
  let index = newList.findIndex((it) => it.id === item.id);
  newList[index] = item;
  return newList;
}

export function removeFromList(list: RecordList, item: any) {
  let newList = [...list];
  return RecordList.fromList(newList.remove(item));
}

export function includeSimpleRegistry(
  storage: RecordList,
  item: any,
  validationMethod = (item: any) => item.name,
  searchMethod = (target: any, iter: any) => iter.name === target.name
) {
  if (validationMethod(item)) {
    if (!storage.find((it: any) => searchMethod(item, it) && it.id !== item.id)) {
      if (item.id) {
        return updateList(storage, item);
      } else {
        return addToList(storage, item);
      }
    } else {
      throw new DuplicatedEntry();
    }
  } else {
    throw new EmptyFieldError();
  }
}

export function buildErrorMessage(
  error: Error,
  name: string,
  type: string
): string {
  if (error instanceof DuplicatedEntry)
    return `The ${type} '${name}' already exists`;
  else if (error instanceof EmptyFieldError)
    return `One or more fields were not informed`;
  else if (error instanceof EntryIdNotFound)
    return `The ${type} with id '${error.id}' does not exist`;
  else return `Could not add the ${type} '${name}'`;
}
