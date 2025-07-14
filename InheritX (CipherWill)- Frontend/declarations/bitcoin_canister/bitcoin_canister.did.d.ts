import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BitcoinNetwork = { 'Mainnet' : null } |
  { 'Regtest' : null } |
  { 'Testnet' : null };
export type ManualReply = { 'txid' : string } |
  { 'inSufficientFunds' : boolean } |
  { 'unAuthorized' : boolean };
export interface ManualReply_1 {
  'next_page' : [] | [Uint8Array | number[]],
  'tip_height' : number,
  'tip_block_hash' : Uint8Array | number[],
  'utxos' : Array<Utxo>,
}
export interface Outpoint { 'txid' : Uint8Array | number[], 'vout' : number }
export interface SendRequest {
  'destinationAddress' : string,
  'identifier' : number,
}
export interface Utxo {
  'height' : number,
  'value' : bigint,
  'outpoint' : Outpoint,
}
export interface _SERVICE {
  'bitcoin_transfer' : ActorMethod<[SendRequest], ManualReply>,
  'get_balance' : ActorMethod<[string], bigint>,
  'get_balance_by_identifier' : ActorMethod<[number], bigint>,
  'get_bitcoin_network' : ActorMethod<[], BitcoinNetwork>,
  'get_current_fees_percentiles' : ActorMethod<[], BigUint64Array | bigint[]>,
  'get_p2pkh_address' : ActorMethod<[number], string>,
  'get_utxos' : ActorMethod<[string], ManualReply_1>,
  'get_will_canister_id' : ActorMethod<[], string>,
  'set_will_canister_id' : ActorMethod<[string], string>,
}
