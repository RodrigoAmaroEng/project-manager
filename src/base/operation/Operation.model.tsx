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
    name: "Operation",
    transform: (item: any) =>
      Object.assign(item, {
        terminator: item.terminator?.id ?? item.terminator,
        inputPayload: item.inputPayload?.id ?? item.inputPayload,
        outputPayload: item.outputPayload?.id ?? item.outputPayload,
      }),
    tag: "O",
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
      terminator: {
        placeholder: "Who performs/receives it",
        required: true,
        type: FieldType.dropdown,
        source: Terminator,
        sourceType: SourceType.list,
        size: FieldSize.half,
        allowAdd: true,
        label: "Terminator"
      },
      inputPayload: {
        placeholder: "Input payload",
        required: true,
        type: FieldType.dropdown,
        source: Payload,
        sourceType: SourceType.list,
        size: FieldSize.half,
        allowAdd: true,
        label: "Input payload"
      },
      outputPayload: {
        placeholder: "Output payload",
        required: false,
        type: FieldType.dropdown,
        source: Payload,
        sourceType: SourceType.list,
        size: FieldSize.half,
        allowAdd: true,
        label: "Output payload"

      },
    },
  };

  trigger: string;
  inputPayload: number;
  outputPayload?: number;
  constructor(
    id: number,
    name: string,
    direction: Direction,
    terminator: number,
    trigger: string,
    inputPayload: number,
    description?: string,
    outputPayload?: number
  ) {
    super(id, name, description);
    this.trigger = trigger;
    this.inputPayload = inputPayload;
    this.outputPayload = outputPayload;
  }
}
