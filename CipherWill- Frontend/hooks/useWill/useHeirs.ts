//hook to fetch all wills for claimer

import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { heirsWillsAtom } from "@/state/jotai";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

export function useHeirs() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [heirsWills, setHeirsWills] = useAtom(heirsWillsAtom);

  const toast = useToast();
  useEffect(() => {
    const fetchHeirsWills = async () => {
      try {
        setLoading(true);
        console.log("Request Heirs list Running...");
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const willsForHeirs = await actorWill.get_willsC();
        console.log(
          "🚀 ~ file: will.ts:62 ~ fetchHeirsWills ~ willsForHeirs:",
          willsForHeirs
        );
        setHeirsWills(willsForHeirs);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as string);
        showToast(
          toast,
          "Error Occured in Getting Heirs List",
          JSON.stringify(err),
          "success",
          "top"
        );
      }
    };
    if (heirsWills) {
      console.log("Fetching Heirs Wills Not Running");
    } else {
      console.log("Fetching Heirs Wills Is Running");
      fetchHeirsWills();
    }
  });

  return [heirsWills, isLoading, error] as const;
}
