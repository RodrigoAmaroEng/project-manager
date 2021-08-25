export function addPayloadEntityProperty(
  payloadId: number,
  entity: any,
  property: any
) {
  return {
    type: "crud/add-payload-entity-property",
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
    type: "crud/add-payload-new-property",
    payload: { payloadId, name, type },
  };
}

export function removePayloadProperty(item: string, payloadId: number) {
  return {
    type: "crud/remove-payload-property",
    payload: { item, payloadId },
  };
}