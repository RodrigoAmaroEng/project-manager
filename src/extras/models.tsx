import "./extension-functions";
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

export function searchObject(content: any, search: string) {
  return content.terminators

    .map((it: any) => Object.assign(it, { tag: "T" }))
    .concat(content.entities.map((it: any) => Object.assign(it, { tag: "E" })))
    .concat(
      content.entities
        .flatMap((it: any) => it.properties)
        .map((it: any) => Object.assign(it, { tag: "R" }))
    )
    .concat(content.payloads.map((it: any) => Object.assign(it, { tag: "P" })))
    .concat(
      content.operations.map((it: any) => Object.assign(it, { tag: "O" }))
    )
    .map((it: any) =>
      Object.assign({}, { id: it.id, name: it.name, tag: it.tag })
    )
    .filter(
      (it: any) => it.name.toLowerCase().indexOf(search?.toLowerCase()) > -1
    );
}

export function findObject(content: any, id: number, type: string) {
  let item = content.terminators
    .map((it: any) => Object.assign(it, { tag: "T" }))
    .concat(content.entities.map((it: any) => Object.assign(it, { tag: "E" })))
    .concat(
      content.entities
        .flatMap((it: any) => it.properties ?? [])
        .map((it: any) => Object.assign(it, { tag: "R" }))
    )
    .concat(content.payloads.map((it: any) => Object.assign(it, { tag: "P" })))
    .concat(
      content.operations.map((it: any) => Object.assign(it, { tag: "O" }))
    )
    .map((it: any) =>
      Object.assign({}, { id: it.id, name: it.name, tag: it.tag })
    )
    .find((it: any) => Number(it.id) === Number(id) && it.tag === type);
  return item;
}
