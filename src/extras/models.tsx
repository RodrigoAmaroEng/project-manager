import { type } from "os";

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

class BasicObject {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class BasicObjectWithDescription extends BasicObject {
  description?: string;
  constructor(id: number, name: string, description?: string) {
    super(id, name);
    this.description = description;
  }
}

export class Terminator extends BasicObjectWithDescription {
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },
    name: {
      placeholder: "Terminator name",
      required: true,
      type: FieldType.input,
      size: FieldSize.half,
      onWizard: true,
    },
    description: {
      placeholder: "Terminator description",
      required: false,
      type: FieldType.smartInput,
      size: FieldSize.full,
      onWizard: false,
    },
  };
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}

class Property extends BasicObject {
  type: DataTypes;
  constructor(id: number, name: string, type: DataTypes) {
    super(id, name);
    this.type = type;
  }
}

class Entity extends BasicObjectWithDescription {
  properties: Property[] = [];
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}

class PayloadProperty {
  id: number;
  kind: PropertyType;
  name?: string;
  type?: DataTypes;
  entityId?: number;
  propertyId?: number;
  constructor(
    id: number,
    kind: PropertyType,
    name: string,
    type: DataTypes,
    entityId?: number,
    propertyId?: number
  ) {
    this.id = id;
    this.kind = kind;
    this.entityId = entityId;
    this.propertyId = propertyId;
    this.name = name;
    this.type = type;
  }
}

class Payload extends BasicObjectWithDescription {
  properties: PayloadProperty[] = [];
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}

class Operation extends BasicObjectWithDescription {
  trigger: string;
  inputPayloadId: number;
  outputPayloadId?: number;
  constructor(
    id: number,
    name: string,
    trigger: string,
    inputPayloadId: number,
    description?: string,
    outputPayloadId?: number
  ) {
    super(id, name, description);
    this.trigger = trigger;
    this.inputPayloadId = inputPayloadId;
    this.outputPayloadId = outputPayloadId;
  }
}
