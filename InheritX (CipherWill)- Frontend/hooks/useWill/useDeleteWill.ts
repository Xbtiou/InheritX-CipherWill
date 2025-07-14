//------------------Hook for Deleting Will---------------

import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { ManualReply_3 } from "@/declarations/will/will.did";
import { testatorWillsAtom, isDeleteDetailsCloseAtom } from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { showToast } from "@/utils/toast";

export function useDeleteWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  ///atoms
  const [, setTestatorWills] = useAtom(testatorWillsAtom);
  const [, setIsDeleteDetailsClose] = useAtom(isDeleteDetailsCloseAtom);
  const toast = useToast();

  const deleteWill = async (identifier: number, willType: string) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const deleteWillResult: ManualReply_3 = await actorWill.delete_will(
        identifier,
        willType,
        []
      );
      console.log(
        "🚀 ~ file: will.ts:164 ~ deleteWill ~ deleteWillResult:",
        deleteWillResult
      );
      if (
        ("icrc" in deleteWillResult &&
          "icpRetainResult" in deleteWillResult.icrc &&
          "success" in deleteWillResult.icrc.icpRetainResult &&
          deleteWillResult.icrc.icpRetainResult.success === true) ||
        ("icrc" in deleteWillResult &&
          "ckbtcRetainResult" in deleteWillResult.icrc &&
          "success" in deleteWillResult.icrc.ckbtcRetainResult &&
          deleteWillResult.icrc.ckbtcRetainResult.success === true)
      ) {
        setLoading(false);
        setTestatorWills(null);
        setIsDeleteDetailsClose(true);

        showToast(toast, "Will Deleted Successfully", "", "success", "top");
      } else {
        setLoading(false);

        showToast(toast, "Error Occured in Deleting Will", "", "error", "top");
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      setLoading(false);

      showToast(
        toast,
        "Error Occured in Deleting Will",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };

  return [deleteWill, isLoading] as const;
}
