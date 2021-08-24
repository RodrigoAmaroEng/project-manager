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

export enum Direction {
  input,
  output,
}

export enum SourceType {
  enumeration,
  list,
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

export class Property extends BasicObject {
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },
    name: {
      placeholder: "Property name",
      required: true,
      type: FieldType.input,
      size: FieldSize.half,
    },
    type: {
      placeholder: "Data type",
      required: true,
      type: FieldType.dropdown,
      source: DataTypes,
      sourceType: SourceType.enumeration,
      size: FieldSize.half,
    },
  };
  type: DataTypes;
  constructor(id: number, name: string, type: DataTypes) {
    super(id, name);
    this.type = type;
  }
}

export class Entity extends BasicObjectWithDescription {
  static _source = "entities";
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },
    name: {
      placeholder: "Entity name",
      required: true,
      type: FieldType.input,
      size: FieldSize.half,
    },
    description: {
      placeholder: "Entity description",
      required: false,
      type: FieldType.smartInput,
      size: FieldSize.full,
    },
    properties: {
      placeholder: "Properties for this entity",
      required: true,
      type: FieldType.list,
      kind: Property,
      size: FieldSize.full,
    },
  };
  properties: Property[] = [];
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}

export class PayloadProperty {
  static _source = "entities.properties";
  static _validation = (item: any) =>
    item.kind === PropertyType.EntityProperty
      ? item.entityId && item.propertyId
      : item.name && item.type;
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },

    kind: {
      placeholder: "What kind of property is it?",
      required: true,
      type: FieldType.radio,
      source: PropertyType,
      sourceType: SourceType.enumeration,
      size: FieldSize.full,
    },
    name: {
      placeholder: "Payload name",
      required: false,
      type: FieldType.input,
      size: FieldSize.half,
      conditionField: "kind",
      condition: PropertyType.Variable,
    },
    type: {
      placeholder: "Data type of this property",
      required: false,
      type: FieldType.dropdown,
      source: DataTypes,
      sourceType: SourceType.enumeration,
      size: FieldSize.half,
      conditionField: "kind",
      condition: PropertyType.Variable,
    },
    entityId: {
      placeholder: "Entity that ows the property",
      required: false,
      type: FieldType.dropdown,
      source: Entity,
      sourceType: SourceType.list,
      size: FieldSize.half,
      conditionField: "kind",
      condition: PropertyType.EntityProperty,
    },
    propertyId: {
      placeholder: "Entity property",
      required: false,
      type: FieldType.dropdown,
      source: Property,
      sourceType: SourceType.list,
      size: FieldSize.half,
      dependsOn: "entityId",
      conditionField: "kind",
      condition: PropertyType.EntityProperty,
    },
  };

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

export class Payload extends BasicObjectWithDescription {
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },
    name: {
      placeholder: "Payload name",
      required: true,
      type: FieldType.input,
      size: FieldSize.half,
    },
    description: {
      placeholder: "Payload description",
      required: false,
      type: FieldType.smartInput,
      size: FieldSize.full,
    },
    properties: {
      placeholder: "Properties for this entity",
      required: true,
      type: FieldType.list,
      kind: PayloadProperty,
      size: FieldSize.full,
    },
  };
  properties: PayloadProperty[] = [];
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}

export class Operation extends BasicObjectWithDescription {
  static _definitions: any = {
    id: {
      type: FieldType.identifier,
    },
    name: {
      placeholder: "Operation name",
      required: true,
      type: FieldType.input,
      size: FieldSize.half,
    },
    description: {
      placeholder: "Operation description",
      required: false,
      type: FieldType.smartInput,
      size: FieldSize.full,
    },
    trigger: {
      placeholder: "What triggers the operation",
      required: true,
      type: FieldType.smartInput,
      size: FieldSize.full,
    },
    direction: {
      placeholder: "Direction",
      required: true,
      type: FieldType.radio,
      source: Direction,
      sourceType: SourceType.enumeration,
      size: FieldSize.full,
    },
    terminatorId: {
      placeholder: "Who performs/receives it",
      required: true,
      type: FieldType.dropdown,
      source: Terminator,
      sourceType: SourceType.list,
      size: FieldSize.half,
    },
    inputPayloadId: {
      placeholder: "Input payload",
      required: true,
      type: FieldType.dropdown,
      source: Payload,
      sourceType: SourceType.list,
      size: FieldSize.half,
    },
    outputPayloadId: {
      placeholder: "Output payload",
      required: false,
      type: FieldType.dropdown,
      source: Payload,
      sourceType: SourceType.list,
      size: FieldSize.half,
    },
  };

  trigger: string;
  inputPayloadId: number;
  outputPayloadId?: number;
  constructor(
    id: number,
    name: string,
    direction: Direction,
    terminatorId: number,
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
