export function startWizard() {
  return { type: "new-project/start-wizard" };
}

export function finishTerminatorStep() {
  return { type: "new-project/finish-terminator" };
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

export function goToEntityProperties() {
  return {
    type: "new-project/finish-entity",
  };
}

export function finishEntityProperties(entityId: number) {
  return {
    type: "new-project/finish-entity-properties",
    payload: { entityId },
  };
}
