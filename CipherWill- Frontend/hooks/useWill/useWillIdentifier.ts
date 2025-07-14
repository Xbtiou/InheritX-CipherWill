import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { isUserExistsAtom, identifierAtom } from "@/state/jotai";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

export function useWillIdentifier() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [identifier, setIdentifier] = useAtom(identifierAtom);

  const toast = useToast();

  const requestWillIdentifier = async () => {
    try {
      console.log("Request Identifier Running...");
      setLoading(true);
      const actorWill: WILL = await createActor("will");
      const requestWillIdentifierResult =
        await actorWill.request_random_will_identifier();
      console.log(
        "🚀 ~ file: will.ts:24 ~ requestWillIdentifier ~ requestWillIdentifierResult:",
        requestWillIdentifierResult
      );

      setIdentifier(requestWillIdentifierResult);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err as string);

      showToast(
        toast,
        "Error Occured in Requesting Random_will_identifier",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };
  return [identifier, requestWillIdentifier, isLoading, error] as const;
}
