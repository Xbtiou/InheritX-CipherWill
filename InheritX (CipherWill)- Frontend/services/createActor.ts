import {
  willIDL,
  providersIDL,
  icpLedgerIDL,
  ckBTCIDL,
  icrcIDL,
  bitcoinCanisterIDL,
} from "@/configs/canisterIDLs";

import { actorPlug } from "./provider/plugActor";
import { IDL } from "@dfinity/candid";

interface ProviderActor {
  canisterId: string;
  idl: IDL.InterfaceFactory;
}

// choose which wallet provider is being currently use
async function chooseProviderActor(args: ProviderActor) {
  const walletProvider = "Plug"; //currently plug is hardcoded, will replaced by a function to return currenct connected provider

  switch (walletProvider) {
    case "Plug":
      return await actorPlug(args.canisterId, args.idl);
  }
}

// single abstract function to create Actor of different canister with different wallet provider
export async function createActor(canisterName: string) {
  let canisterId: string;
  let idl: IDL.InterfaceFactory;

  switch (canisterName) {
    case "will":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_WILL!;
      idl = willIDL;
      return await chooseProviderActor({ canisterId, idl });

    case "icrc":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!;
      idl = icrcIDL;
      return await chooseProviderActor({ canisterId, idl });

    case "providers":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_PROVIDERS!;
      idl = providersIDL;
      return await chooseProviderActor({ canisterId, idl });

    case "icp_ledger":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_ICP_LEDGER!;
      idl = icpLedgerIDL;
      return await chooseProviderActor({ canisterId, idl });

    case "ckbtc_ledger":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_CKBTC_LEDGER!;
      idl = ckBTCIDL;
      return await chooseProviderActor({ canisterId, idl });

    case "bitcoin_canister":
      canisterId = process.env.NEXT_PUBLIC_CANISTER_ID_BTC!;
      idl = bitcoinCanisterIDL;
      return await chooseProviderActor({ canisterId, idl });

    default:
      return null;
  }
}
