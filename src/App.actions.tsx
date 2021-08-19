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