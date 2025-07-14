import { BTC_CANISTER, CKBTC, ICP } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import {
  convertIdentifierToIcpIdentifier,
  getSubAccountArray,
} from "./identifier2Address";
import { e8sToHuman } from "./e8s";
import { Principal } from "@dfinity/principal";

export const getBalance = async (
  asset: string,
  identifier: number
): Promise<string> => {
  try {
    switch (asset) {
      case "ICP":
        const actorICP: ICP = await createActor("icp_ledger");
        const address: string = convertIdentifierToIcpIdentifier(identifier);
        const balance = await actorICP.account_balance_dfx({
          account: address,
        });
        return String(e8sToHuman(balance.e8s));

      case "ckBTC":
        const actorckBTC: CKBTC = await createActor("ckbtc_ledger");

        const balanceckBTC = await actorckBTC.icrc1_balance_of({
          owner: Principal.fromText(process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!),
          subaccount: [getSubAccountArray(identifier)],
        });
        console.log(
          "🚀 ~ file: getBalance.ts:32 ~ balanceckBTC:",
          balanceckBTC
        );

        return String(e8sToHuman(balanceckBTC));

      case "BTC":
        const actorBitcoinCanister: BTC_CANISTER = await createActor(
          "bitcoin_canister"
        );

        const balanceResult =
          await actorBitcoinCanister.get_balance_by_identifier(identifier);
        console.log(
          "🚀 ~ file: useGetBTCBalance.ts:18 ~ getBTCBalance ~ balanceResult:",
          balanceResult
        );

        return String(e8sToHuman(balanceResult));

      default:
        return "No Asset Matched";
    }
  } catch (error) {
    console.log("🚀 ~ file: getBalance.ts:53 ~ error:", error);
    return "Error in Fetching Balance";
  }
};

// function to fetch wallet balance at login
export const getWalletBalance = async (
  assetName: string,
  principal: Principal
): Promise<string> => {
  switch (assetName) {
    case "ICP":
      const actorICP: ICP = await createActor("icp_ledger");
      const balanceICP = await actorICP.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      console.log("🚀 ~ file: getBalance.ts:73 ~ balanceICP:", balanceICP);
      return String(e8sToHuman(balanceICP)!.toFixed(5));

    case "ckBTC":
      const actorckBTC: CKBTC = await createActor("ckbtc_ledger");
      const balanceckBTC = await actorckBTC.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      console.log("🚀 ~ file: getBalance.ts:82 ~ balanceckBTC:", balanceckBTC);
      return String(e8sToHuman(balanceckBTC)!.toFixed(5));

    default:
      return "null";
  }
};
