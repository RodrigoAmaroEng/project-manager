export function goToStep(number: number) {
  return { type: "new-project/go-to-step", payload: number };
}

export function addTerminator(name: string) {
  return { type: "new-project/add-terminator", payload: {name} };
}

export function removeTerminator(item: string) {
  return { type: "new-project/remove-terminator", payload: item };
}

export function addOperation(name: string, terminator: any, direction?: string) {
  return {
    type: "new-project/add-operation",
    payload: { name, terminator: terminator?.id, direction },
  };
}

export function removeOperation(item: string) {
  return { type: "new-project/remove-operation", payload: item };
}