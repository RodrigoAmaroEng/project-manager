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

export const FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";

export class EmptyFieldError extends Error {}
export class DuplicatedEntry extends Error {}
export class EntryIdNotFound extends Error {
  id: number;
  constructor(id: number) {
    super();
    this.id = id;
  }
}

export enum FieldType {
  identifier,
  input,
  smartInput,
  dropdown,
  radio,
  process,
  list,
}

export enum FieldSize {
  full = "fill-space",
  half = "half",
  third = "one-third",
  fourth = "one-fourth",
}

export enum Direction {
  input,
  output,
}

export enum SourceType {
  enumeration,
  list,
}

export class BasicObject {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class BasicObjectWithDescription extends BasicObject {
  description?: string;
  constructor(id: number, name: string, description?: string) {
    super(id, name);
    this.description = description;
  }
}
