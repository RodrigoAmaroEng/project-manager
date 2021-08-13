export function goToStep(number: number) {
  return { type: "new-project/go-to-step", payload: number };
}

export function addTerminator(name: string) {
  return { type: "new-project/add-terminator", payload: name };
}

export function removeTerminator(name: string) {
  return { type: "new-project/remove-terminator", payload: name };
}

export function addOperation(name: string, terminator: any, direction?: string) {
  return {
    type: "new-project/add-terminator",
    payload: { name, terminator, direction },
  };
}
