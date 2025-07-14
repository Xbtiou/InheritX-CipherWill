export const idlFactory = ({ IDL }) => {
  const ICRC1Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const ManualReply = IDL.Variant({ 'Ok' : Tokens, 'Err' : IDL.Text });
  const _InlineTransferErrorTxTooOld = IDL.Record({
    'allowed_window_nanos' : IDL.Nat64,
  });
  const _InlineTransferErrorBadFee = IDL.Record({ 'expected_fee' : Tokens });
  const _InlineTransferErrorTxDuplicate = IDL.Record({
    'duplicate_of' : IDL.Nat64,
  });
  const _InlineTransferErrorInsufficientFunds = IDL.Record({
    'balance' : Tokens,
  });
  const TransferError = IDL.Variant({
    'TxTooOld' : _InlineTransferErrorTxTooOld,
    'BadFee' : _InlineTransferErrorBadFee,
    'TxDuplicate' : _InlineTransferErrorTxDuplicate,
    'TxCreatedInFuture' : IDL.Null,
    'InsufficientFunds' : _InlineTransferErrorInsufficientFunds,
  });
  const ManualReply_1 = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : TransferError,
    'message' : IDL.Text,
    'unAuthorized' : IDL.Bool,
  });
  const _InlineICRC1TransferErrorGenericError = IDL.Record({
    'message' : IDL.Text,
    'error_code' : IDL.Nat,
  });
  const _InlineICRC1TransferErrorBadBurn = IDL.Record({
    'min_burn_amount' : IDL.Nat,
  });
  const _InlineICRC1TransferErrorDuplicate = IDL.Record({
    'duplicate_of' : IDL.Nat,
  });
  const _InlineICRC1TransferErrorBadFee = IDL.Record({
    'expected_fee' : IDL.Nat,
  });
  const _InlineICRC1TransferErrorCreatedInFuture = IDL.Record({
    'ledger_time' : IDL.Nat64,
  });
  const _InlineICRC1TransferErrorInsufficientFunds = IDL.Record({
    'balance' : IDL.Nat,
  });
  const ICRC1TransferError = IDL.Variant({
    'GenericError' : _InlineICRC1TransferErrorGenericError,
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : _InlineICRC1TransferErrorBadBurn,
    'Duplicate' : _InlineICRC1TransferErrorDuplicate,
    'BadFee' : _InlineICRC1TransferErrorBadFee,
    'CreatedInFuture' : _InlineICRC1TransferErrorCreatedInFuture,
    'TooOld' : IDL.Null,
    'InsufficientFunds' : _InlineICRC1TransferErrorInsufficientFunds,
  });
  const ManualReply_2 = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : ICRC1TransferError,
    'message' : IDL.Text,
    'unAuthorized' : IDL.Bool,
  });
  const ManualReply_3 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const ManualReply_4 = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : ICRC1TransferError,
    'message' : IDL.Text,
    'success' : IDL.Nat,
    'unAuthorized' : IDL.Bool,
  });
  return IDL.Service({
    'binary_address_from_principal' : IDL.Func(
        [IDL.Principal, IDL.Nat32],
        [IDL.Vec(IDL.Nat8)],
        ['query'],
      ),
    'canisterBalance128' : IDL.Func([], [IDL.Nat], ['query']),
    'ckbtc_balance_of' : IDL.Func([ICRC1Account], [IDL.Nat], ['query']),
    'ckbtc_fee' : IDL.Func([], [IDL.Nat], ['query']),
    'getIdentifierBlob' : IDL.Func([IDL.Nat32], [IDL.Vec(IDL.Nat8)], ['query']),
    'get_account_balance_of_icp_identifier' : IDL.Func(
        [IDL.Principal, IDL.Nat32],
        [ManualReply],
        [],
      ),
    'get_canister_binary_subaccount_from_identifier' : IDL.Func(
        [IDL.Nat32],
        [IDL.Vec(IDL.Nat8)],
        ['query'],
      ),
    'get_canister_hex_subaccount_from_identifier' : IDL.Func(
        [IDL.Nat32],
        [IDL.Text],
        ['query'],
      ),
    'get_icrc_canister_id' : IDL.Func([], [IDL.Principal], ['query']),
    'get_will_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'hex_address_from_principal' : IDL.Func(
        [IDL.Principal, IDL.Nat32],
        [IDL.Text],
        ['query'],
      ),
    'icp_transfer' : IDL.Func([IDL.Nat32, IDL.Principal], [ManualReply_1], []),
    'icrc_ckbtc_transfer' : IDL.Func(
        [IDL.Nat32, IDL.Principal],
        [ManualReply_2],
        [],
      ),
    'icrc_icp_balanceOf' : IDL.Func([IDL.Nat32], [ManualReply_3], ['query']),
    'icrc_icp_fee' : IDL.Func([], [ManualReply_3], ['query']),
    'icrc_icp_transfer' : IDL.Func(
        [IDL.Nat32, IDL.Principal],
        [ManualReply_4],
        [],
      ),
    'list_canister_ids' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'verify_icrc_controller' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [IDL.Bool],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
