import { BTC_CANISTER } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { identifierAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { useState } from "react";

export function useGetP2PKHAddress() {
  const [identifier] = useAtom(identifierAtom);
  const [address, setAddress] = useState<string>("Loading...");

  const getP2PKHAddress = async () => {
    try {
      if (identifier) {
        const actorBitcoinCanister: BTC_CANISTER = await createActor(
          "bitcoin_canister"
        );

        const addressResult = await actorBitcoinCanister.get_p2pkh_address(
          identifier
        );
        console.log(
          "🚀 ~ file: useGetP2PKHAddress.ts:17 ~ getP2PKHAddress ~ addressResult:",
          addressResult
        );

        setAddress(addressResult);
      } else {
        console.log("Identifier Not Found");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: useGetP2PKHAddress.ts:31 ~ getP2PKHAddress ~ error:",
        error
      );
    }
  };

  return [address, getP2PKHAddress] as const;
}
