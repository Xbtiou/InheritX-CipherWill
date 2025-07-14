export const ICP_LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export const CKBTC_CANISTER = "mxzaz-hqaaa-aaaar-qaada-cai";
export const WILL_CANISTER_ID = "";
export const PROVIDERS_CANISTER_ID = "";
export const ICRC_CANISTER_ID = "";
export const BTC_CANISTER_ID = "";
export const CANISTER_WHITE_LIST: string[] = [
  process.env.NEXT_PUBLIC_CANISTER_ID_WILL!,

  process.env.NEXT_PUBLIC_CANISTER_ID_PROVIDERS!,

  process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!,

  process.env.NEXT_PUBLIC_CANISTER_ID_BTC!,

  process.env.NEXT_PUBLIC_CANISTER_ID_ICP_LEDGER!,

  process.env.NEXT_PUBLIC_CANISTER_ID_CKBTC_LEDGER!,
];
