import { Terminator } from "../terminator/Terminator.model";
import {
  BasicObjectWithDescription,
  FieldType,
  FieldSize,
  Direction,
  SourceType,
} from "../../extras/models";
import { Payload } from "../payload/Payload.model";

export class Operation extends BasicObjectWithDescription {
  static _meta: any = {
    transform: (item: any) =>
      Object.assign(item, {
        terminatorId: item.terminatorId?.id ?? item.terminatorId,
        inputPayloadId: item.inputPayloadId?.id ?? item.inputPayloadId,
        outputPayloadId: item.outputPayloadId?.id ?? item.outputPayloadId,
      }),
    fields: {
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
