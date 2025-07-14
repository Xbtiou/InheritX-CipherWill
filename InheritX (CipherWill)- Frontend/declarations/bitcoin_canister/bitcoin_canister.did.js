export const idlFactory = ({ IDL }) => {
  const BitcoinNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const SendRequest = IDL.Record({
    'destinationAddress' : IDL.Text,
    'identifier' : IDL.Nat32,
  });
  const ManualReply = IDL.Variant({
    'txid' : IDL.Text,
    'inSufficientFunds' : IDL.Bool,
    'unAuthorized' : IDL.Bool,
  });
  const Outpoint = IDL.Record({
    'txid' : IDL.Vec(IDL.Nat8),
    'vout' : IDL.Nat32,
  });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : Outpoint,
  });
  const ManualReply_1 = IDL.Record({
    'next_page' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'tip_height' : IDL.Nat32,
    'tip_block_hash' : IDL.Vec(IDL.Nat8),
    'utxos' : IDL.Vec(Utxo),
  });
  return IDL.Service({
    'bitcoin_transfer' : IDL.Func([SendRequest], [ManualReply], []),
    'get_balance' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'get_balance_by_identifier' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'get_bitcoin_network' : IDL.Func([], [BitcoinNetwork], ['query']),
    'get_current_fees_percentiles' : IDL.Func([], [IDL.Vec(IDL.Nat64)], []),
    'get_p2pkh_address' : IDL.Func([IDL.Nat32], [IDL.Text], []),
    'get_utxos' : IDL.Func([IDL.Text], [ManualReply_1], []),
    'get_will_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'set_will_canister_id' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => {
  const BitcoinNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  return [BitcoinNetwork];
};
