export function addTerminator(name: string) {
  return { type: "crud/add-terminator", payload: { name } };
}

export function removeTerminator(item: string) {
  return { type: "crud/remove-terminator", payload: item };
}