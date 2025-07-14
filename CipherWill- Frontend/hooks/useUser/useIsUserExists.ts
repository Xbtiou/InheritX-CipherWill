import { WILL } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { isUserExistsAtom } from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

export function useIsUserExists() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const userExists = await actorWill.is_user_principal_found();
        console.log(
          "🚀 ~ file: useUser.tsx:13 ~ useUser ~ userExists:",
          userExists
        );
        userExists ? setUserExists(true) : setUserExists(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(error);
        toast({
          title: "Account created.",
          description: JSON.stringify(err),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchUserDetails();
  }, []);

  return [isUserExists, isLoading, error] as const;
}
