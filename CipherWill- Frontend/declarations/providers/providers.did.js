export const idlFactory = ({ IDL }) => {
  const TestatorDetails = IDL.Record({
    'sex' : IDL.Text,
    'birthDate' : IDL.Text,
    'birthLocationCode' : IDL.Text,
    'firstNames' : IDL.Vec(IDL.Text),
    'lastName' : IDL.Text,
  });
  const ManualReply = IDL.Record({
    'result' : IDL.Bool,
    'errorMessage' : IDL.Opt(IDL.Text),
    'message' : IDL.Opt(IDL.Text),
  });
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponse = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const HttpTransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponse,
  });
  return IDL.Service({
    'canisterBalance128' : IDL.Func([], [IDL.Nat], ['query']),
    'check_testator_details_with_id' : IDL.Func(
        [IDL.Principal, IDL.Text, TestatorDetails],
        [ManualReply],
        [],
      ),
    'get_matchid_url' : IDL.Func([], [IDL.Text], []),
    'isTestatorDied' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'testator_details_transform' : IDL.Func(
        [HttpTransformArgs],
        [HttpResponse],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
