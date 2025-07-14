//------------------Hook for Deleting Will---------------

import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { ManualReply_3 } from "@/declarations/will/will.did";
import { testatorWillsAtom, isDeleteDetailsCloseAtom } from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { showToast } from "@/utils/toast";

export function useBTCDeleteWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);

  ///atoms
  const [, setTestatorWills] = useAtom(testatorWillsAtom);
  const [, setIsDeleteDetailsClose] = useAtom(isDeleteDetailsCloseAtom);
  const toast = useToast();

  const deleteBTCWill = async (
    identifier: number,
    willType: string,
    p2pkhaddress: string
  ) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const deleteWillResult: ManualReply_3 = await actorWill.delete_will(
        identifier,
        willType,
        [p2pkhaddress]
      );
      console.log(
        "🚀 ~ file: useBTCDeleteWill.ts:36 ~ useDeleteWill ~ deleteWillResult:",
        deleteWillResult
      );

      if (
        ("btc" in deleteWillResult &&
          "btcRetainResult" in deleteWillResult.btc &&
          "success" in deleteWillResult.btc.btcRetainResult &&
          deleteWillResult.btc.btcRetainResult.success === true) ||
        ("icrc" in deleteWillResult &&
          "ckbtcRetainResult" in deleteWillResult.icrc &&
          "success" in deleteWillResult.icrc.ckbtcRetainResult &&
          deleteWillResult.icrc.ckbtcRetainResult.success === true)
      ) {
        setLoading(false);
        setTestatorWills(null);
        setIsDeleteDetailsClose(true);

        showToast(toast, "Will Deleted!", "", "success", "top");
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

  return [deleteBTCWill, isLoading] as const;
}
