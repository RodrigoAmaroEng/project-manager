export function navigateTo(payload: string) {
  return { type: "menu/navigate-to", payload };
}
export function editRecord(id: number) {
  return { type: "form/edit-record", payload: id };
}