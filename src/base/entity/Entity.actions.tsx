export function addEntity(name: string) {
  return { type: "crud/add-entity", payload: { name } };
}

export function removeEntity(item: string) {
  return { type: "crud/remove-entity", payload: item };
}

export function addEntityProperty(name: string, entityId: number, type: any) {
  return {
    type: "crud/add-entity-property",
    payload: { name, type, entityId },
  };
}

export function removeEntityProperty(item: string, entityId: number) {
  return {
    type: "crud/remove-entity-property",
    payload: { item, entityId },
  };
}