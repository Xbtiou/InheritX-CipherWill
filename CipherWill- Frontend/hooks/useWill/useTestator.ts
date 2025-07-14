import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { testatorWillsAtom } from "@/state/jotai";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

export function useTestator() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [testatorWills, setTestatorWills] = useAtom(testatorWillsAtom);

  const toast = useToast();
  useEffect(() => {
    const fetchTestatorWills = async () => {
      try {
        setLoading(true);
        console.log("Request Identifier Running...");
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const willsForTestator = await actorWill.get_willsT();
        console.log(
          "🚀 ~ file: will.ts:62 ~ fetchTestatorWills ~ willsForTestator:",
          willsForTestator
        );
        setTestatorWills(willsForTestator);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as string);

        showToast(
          toast,
          "Error Occured in Fetching Testator Wills",
          JSON.stringify(error),
          "error",
          "top"
        );
      }
    };
    if (testatorWills) {
      console.log("Fetching Testator Wills Not Running");
    } else {
      console.log("Fetching Testator Wills Is Running");
      fetchTestatorWills();
    }
  });

  return [testatorWills, isLoading, error] as const;
}
