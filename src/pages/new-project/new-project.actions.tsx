export function startWizard() {
  return { type: "new-project/start-wizard" };
}

export function finishTerminatorStep() {
  return { type: "new-project/finish-terminator" };
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
    type: "new-project/finish-operation",
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
    type: "new-project/finish-entity",
  };
}

export function addEntityProperty(name: string, entityId: number, type: any) {
  return {
    type: "new-project/add-entity-property",
    payload: { name, type, entityId },
  };
}

export function removeEntityProperty(item: string, entityId: number) {
  return {
    type: "new-project/remove-entity-property",
    payload: { item, entityId },
  };
}

export function addPayloadEntityProperty(
  payloadId: number,
  entity: any,
  property: any
) {
  return {
    type: "new-project/add-payload-entity-property",
    payload: {
      payloadId,
      entityId: entity.id,
      propertyId: property.id,
      propertyName: property.name,
    },
  };
}
export function addPayloadNewProperty(
  payloadId: number,
  name?: string,
  type?: string
) {
  return {
    type: "new-project/add-payload-new-property",
    payload: { payloadId, name, type },
  };
}

export function removePayloadProperty(item: string, payloadId: number) {
  return {
    type: "new-project/remove-payload-property",
    payload: { item, payloadId },
  };
}

export function finishEntityProperties(entityId: number) {
  return {
    type: "new-project/finish-entity-properties",
    payload: { entityId },
  };
}
