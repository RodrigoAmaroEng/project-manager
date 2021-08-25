export function addOperation(
  name: string,
  terminator: any,
  direction?: string
) {
  return {
    type: "crud/add-operation",
    payload: { name, terminator: terminator?.id, direction },
  };
}

export function removeOperation(item: string) {
  return { type: "crud/remove-operation", payload: item };
}
