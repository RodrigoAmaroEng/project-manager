export function navigateTo(payload: string) {
  return { type: "menu/navigate-to", payload };
}
export function editRecord(id: number) {
  return { type: "form/edit-record", payload: id };
}
export function deleteRecord(type: string, item: any) {
  return { type: "form/remove-"+ type.toLowerCase() , payload: item };
}