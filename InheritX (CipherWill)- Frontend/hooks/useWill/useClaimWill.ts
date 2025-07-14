import { WILL } from "@/configs/canistersService";
import { ManualReply_1 } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import { heirsWillsAtom, isClaimDetailsCloseAtom } from "@/state/jotai";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

export function useClaimWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  ///atoms
  const [, setHeirsWills] = useAtom(heirsWillsAtom);
  const [, setIsClaimDetailsClose] = useAtom(isClaimDetailsCloseAtom);

  const toast = useToast();

  const claimWill = async (identifier: number, willType: string) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const claimWillResult: ManualReply_1 = await actorWill.claim_will(
        identifier,
        willType,
        []
      );

      if (
        ("icrc" in claimWillResult &&
          "icpClaimResult" in claimWillResult.icrc &&
          "success" in claimWillResult.icrc.icpClaimResult &&
          claimWillResult.icrc.icpClaimResult.success === true) ||
        ("icrc" in claimWillResult &&
          "ckbtcClaimResult" in claimWillResult.icrc &&
          "success" in claimWillResult.icrc.ckbtcClaimResult &&
          claimWillResult.icrc.ckbtcClaimResult.success === true)
      ) {
        setLoading(false);
        setHeirsWills(null);
        setIsClaimDetailsClose(true);

        showToast(toast, "Will Claim Successfully", "", "success", "top");
      } else {
        setLoading(false);

        showToast(toast, "Error Occured in Claiming Will", "", "error", "top");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error as string);

      showToast(
        toast,
        "Error Occured in Claiming Will",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };

  return [claimWill, isLoading] as const;
}
