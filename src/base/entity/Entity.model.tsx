import {
  BasicObjectWithDescription,
  FieldType,
  FieldSize,
  BasicObject,
  DataTypes,
  SourceType,
} from "../../extras/models";

export class Property extends BasicObject {
  static _meta: any = {
    name: "Property",
    tag: "R",
    fields: {
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
    },
  };
  type: DataTypes;
  constructor(id: number, name: string, type: DataTypes) {
    super(id, name);
    this.type = type;
  }
}

export class Entity extends BasicObjectWithDescription {
  static _meta: any = {
    name: "Entity",
    tag: "E",
    storeName: "entities",
    fields: {
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
        render: (item: any) => <h6>{item.name} S2</h6>
      },
    },
  };
  properties: Property[] = [];
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}
