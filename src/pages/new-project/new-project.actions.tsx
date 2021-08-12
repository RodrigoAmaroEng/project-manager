export function goToStep(number: number) {
  return { type: "new-project/go-to-step", payload: number };
}

export function addTerminator(name: string) {
  return { type: "new-project/add-terminator", payload: name };
}
