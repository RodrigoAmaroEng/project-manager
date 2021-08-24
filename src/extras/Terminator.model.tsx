import { BasicObjectWithDescription, FieldType, FieldSize } from "./models";


export class Terminator extends BasicObjectWithDescription {
  static _meta: any = {
    storeName: "terminators",
    validation: undefined,
    fields: {
      id: {
        type: FieldType.identifier,
      },
      name: {
        placeholder: "Terminator name",
        required: true,
        type: FieldType.input,
        size: FieldSize.half,
      },
      description: {
        placeholder: "Terminator description",
        required: false,
        type: FieldType.smartInput,
        size: FieldSize.full,
      },
    },
  };;
  constructor(id: number, name: string, description?: string) {
    super(id, name, description);
  }
}
