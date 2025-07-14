import { WILL } from "@/configs/canistersService";
import { ManualReply } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import { useState } from "react";

export function useCheckDeath() {
  const [isDied, setIsDied] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const checkDeath = async (identifier: number) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const checkDeathResult: ManualReply =
        await actorWill.check_death_by_identifier(identifier);

      if ("result" in checkDeathResult && checkDeathResult.result === true) {
        setIsDied(true);
        setLoading(false);
      } else {
        console.log(checkDeathResult);
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ file: will.ts:427 ~ checkDeath ~ error:", error);
    }
  };

  return [isDied, checkDeath, isLoading] as const;
}
