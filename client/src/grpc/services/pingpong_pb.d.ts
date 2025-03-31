import * as jspb from 'google-protobuf'



export class ClientTimeRequest extends jspb.Message {
  getClientEpochTime(): number;
  setClientEpochTime(value: number): ClientTimeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClientTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClientTimeRequest): ClientTimeRequest.AsObject;
  static serializeBinaryToWriter(message: ClientTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClientTimeRequest;
  static deserializeBinaryFromReader(message: ClientTimeRequest, reader: jspb.BinaryReader): ClientTimeRequest;
}

export namespace ClientTimeRequest {
  export type AsObject = {
    clientEpochTime: number,
  }
}

export class ServerTimeResponse extends jspb.Message {
  getServerEpochTime(): number;
  setServerEpochTime(value: number): ServerTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ServerTimeResponse): ServerTimeResponse.AsObject;
  static serializeBinaryToWriter(message: ServerTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerTimeResponse;
  static deserializeBinaryFromReader(message: ServerTimeResponse, reader: jspb.BinaryReader): ServerTimeResponse;
}

export namespace ServerTimeResponse {
  export type AsObject = {
    serverEpochTime: number,
  }
}

export class PingRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): PingRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
    clientId: string,
  }
}

export class PingMessage extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): PingMessage;

  getTimestamp(): number;
  setTimestamp(value: number): PingMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PingMessage): PingMessage.AsObject;
  static serializeBinaryToWriter(message: PingMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingMessage;
  static deserializeBinaryFromReader(message: PingMessage, reader: jspb.BinaryReader): PingMessage;
}

export namespace PingMessage {
  export type AsObject = {
    message: string,
    timestamp: number,
  }
}

