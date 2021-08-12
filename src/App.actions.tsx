import { GoogleUser } from "./extras/gdrive-api";

export function setAuthenticatedUser(user: GoogleUser) {
  return { type: "app/set-authenticated-user", payload: user };
}

export function authenticate() {
  return { type: "app/authenticate"}
}