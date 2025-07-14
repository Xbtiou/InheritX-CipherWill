import { BTC_CANISTER } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { identifierAtom } from "@/state/jotai";
import { e8sToHuman } from "@/utils/e8s";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

export function useGetBTCBalance() {
  const [identifier] = useAtom(identifierAtom);

  const [balance, setBalance] = useState<number>(0);

  const toast = useToast();

  const getBTCBalance = async () => {
    try {
      if (identifier) {
        console.log(
          "🚀 ~ file: useGetBTCBalance.ts:18 ~ getBTCBalance ~ identifier:",
          identifier
        );
        const actorBitcoinCanister: BTC_CANISTER = await createActor(
          "bitcoin_canister"
        );

        const balanceResult =
          await actorBitcoinCanister.get_balance_by_identifier(identifier);
        console.log(
          "🚀 ~ file: useGetBTCBalance.ts:18 ~ getBTCBalance ~ balanceResult:",
          balanceResult
        );

        setBalance(Number(e8sToHuman(balanceResult)));
      } else {
        console.log("Identifier Not Found");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: useGetBTCBalance.ts:34 ~ getBTCBalance ~ error:",
        error
      );
      toast({
        title: "Error In Fetching BTC Balance.",
        description: JSON.stringify(error),
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return [balance, getBTCBalance] as const;
}
