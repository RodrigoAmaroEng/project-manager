export enum DataTypes {
  string = "String",
  number = "Number",
  boolean = "Boolean",
  date = "Date",
  uuid = "UUID",
}
export enum PropertyType {
  EntityProperty = "Entity property",
  Variable = "Variable",
}

export const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder"

export class EmptyFieldError extends Error {}
export class DuplicatedEntry extends Error {}