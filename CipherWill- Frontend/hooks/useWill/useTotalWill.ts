//hook to fetch all wills for claimer

import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { testatorWillsAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { useState } from "react";

export function useTotalWillsC() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [heirsWillsCount, setHeirsWillsCount] = useState<number>(0);

  //=============================================Heirs Wills================================================

  const fetchHeirsWillsCount = async () => {
    console.log("Count of Fetching Heirs Wills Is Running");

    try {
      setLoading(true);
      console.log("Request Heirs list Running...");
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const willsForHeirs = await actorWill.get_willsC();
      console.log(
        "🚀 ~ file: useTotalWill.ts:30 ~ fetchHeirsWillsCount ~ willsForHeirs:",
        willsForHeirs
      );

      setHeirsWillsCount(willsForHeirs.length);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err as string);
    }
  };

  return [heirsWillsCount, fetchHeirsWillsCount, isLoading, error] as const;
}

//=============================================Testator Wills================================================

export function useTotalWillsT() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [testatorWills, setTestatorWills] = useAtom(testatorWillsAtom);
  const [testatorWillsCount, setTestatorWillsCount] = useState<number>(0);

  const fetchtestatorWillsCount = async () => {
    console.log("Count of Fetching Testator Wills Is Running");

    try {
      setLoading(true);
      console.log("Request Heirs list Running...");
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const willsForHeirs = await actorWill.get_willsT();
      console.log(
        "🚀 ~ file: useTotalWill.ts:69 ~ fetchtestatorWillsCount ~ willsForHeirs:",
        willsForHeirs
      );
      setTestatorWillsCount(willsForHeirs.length);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err as string);
    }
  };

  return [
    testatorWillsCount,
    fetchtestatorWillsCount,
    isLoading,
    error,
  ] as const;
}
