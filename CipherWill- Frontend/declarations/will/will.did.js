export const idlFactory = ({ IDL }) => {
  const userDetailsArgs = IDL.Record({
    'sex' : IDL.Text,
    'birthDate' : IDL.Text,
    'birthLocationCode' : IDL.Text,
    'firstNames' : IDL.Vec(IDL.Text),
    'lastName' : IDL.Text,
  });
  const AddUserDetails = IDL.Variant({
    'userExists' : IDL.Bool,
    'success' : IDL.Bool,
  });
  const ManualReply = IDL.Variant({
    'result' : IDL.Bool,
    'errorMessageFromCanisterCall' : IDL.Text,
    'willNotExists' : IDL.Bool,
  });
  const _InlineBTCClaimWillBtcClaimResult = IDL.Record({
    'claimBTCMessage' : IDL.Text,
    'claimBTCError' : IDL.Opt(IDL.Text),
    'success' : IDL.Bool,
  });
  const BTCClaimWill = IDL.Variant({
    'isClaimed' : IDL.Bool,
    'claimError' : IDL.Text,
    'tokenTickerNotSupported' : IDL.Bool,
    'btcClaimResult' : _InlineBTCClaimWillBtcClaimResult,
  });
  const _InlineICRCClaimWillCkbtcClaimResult = IDL.Record({
    'success' : IDL.Bool,
    'claimCKBTCMessage' : IDL.Text,
  });
  const _InlineICRCClaimWillIcpClaimResult = IDL.Record({
    'claimICPMessage' : IDL.Text,
    'success' : IDL.Bool,
  });
  const ICRCClaimWill = IDL.Variant({
    'ckbtcClaimResult' : _InlineICRCClaimWillCkbtcClaimResult,
    'isClaimed' : IDL.Bool,
    'claimError' : IDL.Text,
    'tokenTickerNotSupported' : IDL.Bool,
    'icpClaimResult' : _InlineICRCClaimWillIcpClaimResult,
  });
  const ManualReply_1 = IDL.Variant({
    'btc' : BTCClaimWill,
    'icrc' : ICRCClaimWill,
    'claimErrorFromProvider' : IDL.Text,
    'addressNull' : IDL.Bool,
    'claimErrorFromCanisterCall' : IDL.Text,
    'claimError' : IDL.Bool,
    'willNotExists' : IDL.Bool,
    'unAuthorizedClaimer' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const BTCCreateWillArgs = IDL.Record({
    'heirs' : IDL.Principal,
    'willName' : IDL.Text,
    'willDescription' : IDL.Text,
    'tokenTicker' : IDL.Text,
    'amountInSats' : IDL.Nat,
    'identifier' : IDL.Nat32,
  });
  const ICRCCreateWillArgs = IDL.Record({
    'heirs' : IDL.Principal,
    'willName' : IDL.Text,
    'willDescription' : IDL.Text,
    'tokenTicker' : IDL.Text,
    'identifier' : IDL.Nat32,
    'amount' : IDL.Nat,
  });
  const CreateWillArgs = IDL.Variant({
    'btc' : BTCCreateWillArgs,
    'icrc' : ICRCCreateWillArgs,
  });
  const BTCCreateWill = IDL.Variant({
    'identifierUsed' : IDL.Bool,
    'tokenTickerNotSupported' : IDL.Text,
    'success' : IDL.Bool,
    'userNotExists' : IDL.Bool,
  });
  const ManualReply_2 = IDL.Variant({
    'btc' : BTCCreateWill,
    'icrc' : BTCCreateWill,
    'userNotExists' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const _InlineBTCDeleteWillBtcRetainResult = IDL.Record({
    'retainBTCError' : IDL.Opt(IDL.Text),
    'retainBTCMessage' : IDL.Text,
    'success' : IDL.Bool,
  });
  const BTCDeleteWill = IDL.Variant({
    'isClaimed' : IDL.Bool,
    'retainError' : IDL.Text,
    'tokenTickerNotSupported' : IDL.Bool,
    'btcRetainResult' : _InlineBTCDeleteWillBtcRetainResult,
  });
  const _InlineICRCDeleteWillIcpRetainResult = IDL.Record({
    'success' : IDL.Bool,
    'retainICPMessage' : IDL.Text,
  });
  const _InlineICRCDeleteWillCkbtcRetainResult = IDL.Record({
    'retainCKBTCMessage' : IDL.Text,
    'success' : IDL.Bool,
  });
  const ICRCDeleteWill = IDL.Variant({
    'isClaimed' : IDL.Bool,
    'icpRetainResult' : _InlineICRCDeleteWillIcpRetainResult,
    'retainError' : IDL.Text,
    'ckbtcRetainResult' : _InlineICRCDeleteWillCkbtcRetainResult,
    'tokenTickerNotSupported' : IDL.Bool,
  });
  const ManualReply_3 = IDL.Variant({
    'btc' : BTCDeleteWill,
    'identifierUsed' : IDL.Bool,
    'icrc' : ICRCDeleteWill,
    'unAuthorizedTestator' : IDL.Bool,
    'addressNull' : IDL.Bool,
    'willNotExists' : IDL.Bool,
    'userNotExists' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const Will = IDL.Record({
    'heirs' : IDL.Principal,
    'value' : IDL.Nat,
    'willName' : IDL.Text,
    'timeStamp' : IDL.Nat64,
    'testator' : IDL.Principal,
    'isClaimed' : IDL.Bool,
    'willDescription' : IDL.Text,
    'tokenTicker' : IDL.Text,
    'identifier' : IDL.Nat32,
  });
  const UserDetails = IDL.Record({
    'sex' : IDL.Text,
    'principal' : IDL.Principal,
    'birthDate' : IDL.Text,
    'birthLocationCode' : IDL.Text,
    'firstNames' : IDL.Vec(IDL.Text),
    'lastName' : IDL.Text,
  });
  const GetUserDetails = IDL.Variant({
    'userDetails' : UserDetails,
    'userNotExists' : IDL.Bool,
  });
  const _AzleResult = IDL.Variant({ 'Ok' : Will, 'Err' : IDL.Text });
  const GetHeirWills = IDL.Variant({
    'wills' : IDL.Vec(Will),
    'noWillsExists' : IDL.Bool,
  });
  const GetTestatorWills = IDL.Variant({
    'userNotExists' : IDL.Bool,
    'wills' : IDL.Vec(Will),
    'noWillsExists' : IDL.Bool,
  });
  const ManualReply_4 = IDL.Variant({
    'result' : IDL.Bool,
    'errorMessageFromCanisterCall' : IDL.Text,
    'testatorDetailsNotFound' : IDL.Text,
    'errorMessageFromProviders' : IDL.Text,
    'willNotExists' : IDL.Bool,
  });
  const UpdateUserDetails = IDL.Variant({
    'success' : IDL.Bool,
    'userNotExists' : IDL.Bool,
  });
  return IDL.Service({
    'add_identifier_to_mapping' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat32],
        [],
        [],
      ),
    'add_user_details' : IDL.Func([userDetailsArgs], [AddUserDetails], []),
    'canisterBalance' : IDL.Func([], [IDL.Nat64], ['query']),
    'check_death_by_identifier' : IDL.Func([IDL.Nat32], [ManualReply], []),
    'claim_will' : IDL.Func(
        [IDL.Nat32, IDL.Text, IDL.Opt(IDL.Text)],
        [ManualReply_1],
        [],
      ),
    'create_will' : IDL.Func([CreateWillArgs, IDL.Text], [ManualReply_2], []),
    'delete_will' : IDL.Func(
        [IDL.Nat32, IDL.Text, IDL.Opt(IDL.Text)],
        [ManualReply_3],
        [],
      ),
    'get_all_identifiers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Principal))],
        ['query'],
      ),
    'get_all_wills' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, Will))],
        ['query'],
      ),
    'get_all_willsT' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Float64)))],
        ['query'],
      ),
    'get_bitcoin_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'get_heirs_wills_by_princicpal' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Vec(IDL.Nat32))],
        ['query'],
      ),
    'get_icrc_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'get_providers_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'get_testator_wills_by_princicpal' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Vec(IDL.Nat32))],
        ['query'],
      ),
    'get_user_by_princicpal' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'get_user_details' : IDL.Func([], [GetUserDetails], ['query']),
    'get_will' : IDL.Func([IDL.Nat32], [_AzleResult], ['query']),
    'get_will_canister_id' : IDL.Func([], [IDL.Principal], ['query']),
    'get_willsC' : IDL.Func([], [IDL.Vec(IDL.Float64)], ['query']),
    'get_willsT' : IDL.Func([], [IDL.Vec(IDL.Float64)], ['query']),
    'get_wills_for_heir' : IDL.Func([], [GetHeirWills], ['query']),
    'get_wills_for_testator' : IDL.Func([], [GetTestatorWills], ['query']),
    'is_user_principal_found' : IDL.Func([], [IDL.Bool], ['query']),
    'is_will_exists_heirs' : IDL.Func([], [IDL.Bool], ['query']),
    'is_will_exists_testator' : IDL.Func([], [IDL.Bool], ['query']),
    'remove_identifier_from_mapping' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat32],
        [],
        [],
      ),
    'report_death_by_base64Id' : IDL.Func(
        [IDL.Nat32, IDL.Text],
        [ManualReply_4],
        [],
      ),
    'request_random_will_identifier' : IDL.Func([], [IDL.Nat32], []),
    'update_user_details' : IDL.Func(
        [userDetailsArgs],
        [UpdateUserDetails],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
