export function goToStep(number: number) {
  return { type: "new-project/go-to-step", payload: number };
}

export function addTerminator(name: string) {
  return { type: "new-project/add-terminator", payload: { name } };
}

export function removeTerminator(item: string) {
  return { type: "new-project/remove-terminator", payload: item };
}

export function addOperation(
  name: string,
  terminator: any,
  direction?: string
) {
  return {
    type: "new-project/add-operation",
    payload: { name, terminator: terminator?.id, direction },
  };
}

export function removeOperation(item: string) {
  return { type: "new-project/remove-operation", payload: item };
}

export function goToOperationDetails() {
  return {
    type: "new-project/goto-operation-details",
  };
}

export function saveOperationDetail(id: number, data: any) {
  return {
    type: "new-project/save-operation-details",
    payload: { id, ...data },
  };
}

export function addEntity(name: string) {
  return { type: "new-project/add-entity", payload: { name } };
}

export function removeEntity(item: string) {
  return { type: "new-project/remove-entity", payload: item };
}

export function goToEntityProperties() {
  return {
    type: "new-project/goto-entity-properties",
  };
}

export function addEntityProperty(name: string, entityId: number, type: any) {
  return {
    type: "new-project/add-entity-property",
    payload: { name, type, entityId },
  };
}

export function removeEntityProperty(item: string, entityId: number) {
  return { type: "new-project/remove-entity-property", payload: {item, entityId} };
}
