import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponse {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface HttpTransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponse,
}
export interface ManualReply {
  'result' : boolean,
  'errorMessage' : [] | [string],
  'message' : [] | [string],
}
export interface TestatorDetails {
  'sex' : string,
  'birthDate' : string,
  'birthLocationCode' : string,
  'firstNames' : Array<string>,
  'lastName' : string,
}
export interface _SERVICE {
  'canisterBalance128' : ActorMethod<[], bigint>,
  'check_testator_details_with_id' : ActorMethod<
    [Principal, string, TestatorDetails],
    ManualReply
  >,
  'get_matchid_url' : ActorMethod<[], string>,
  'isTestatorDied' : ActorMethod<[Principal], boolean>,
  'testator_details_transform' : ActorMethod<[HttpTransformArgs], HttpResponse>,
}
