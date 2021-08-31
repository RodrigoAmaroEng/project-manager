export function navigateTo(payload: string) {
  return { type: "menu/navigate-to", payload };
}
export function editRecord(id: number) {
  return { type: "crud/edit-record", payload: id };
}
export function deleteRecord(type: string, item: any) {
  return { type: "crud/remove-" + type.toLowerCase(), payload: item };
}
export function cancelOperation() {
  return { type: "crud/cancel", payload: window.location.pathname };
}

export function addSimpleRecord(type: string, name: string) {
  return { type: `crud/add-simple-${type}`, payload: { name } };
}
