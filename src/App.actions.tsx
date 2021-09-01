import { GoogleUser } from "./extras/gdrive-api";

export function setIsInitialized() {
  return { type: "app/set-gdrive-initialized" };
}

export function setAuthenticatedUser(user: GoogleUser) {
  return { type: "app/set-authenticated-user", payload: user };
}

export function authenticate() {
  return { type: "app/authenticate" };
}

export function dismissError() {
  return { type: "app/dismiss-error" };
}

export function deleteExistingProject() {
  return { type: "app/delete-existing-project" };
}

export function fieldsClear() {
  return { type: "app/fields-were-cleared" };
}

export function putMessage(message: string) {
  return { type: "app/put-message", payload: message };
}

export function askBefore(action: any, message: string) {
  return { type: "app/ask-before-run", payload: { action, message } };
}
export function answerYes() {
  return { type: "app/answer-yes" };
}
export function answerNo() {
  return { type: "app/answer-no" };
}
