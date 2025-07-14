import { WILL } from "@/configs/canistersService";
import { GetUserDetails } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import {
  isUserExistsAtom,
  principalAtom,
  firstNamesAtom,
  lastNameAtom,
  sexAtom,
  birthDateAtom,
  birthLocationCodeAtom,
} from "@/state/jotai";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

export function useUserInfo() {
  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [principal, setPrincipal] = useAtom(principalAtom);
  const [firstNames, setFirstNames] = useAtom(firstNamesAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [sex, setSex] = useAtom(sexAtom);
  const [birthDate, setBirthDate] = useAtom(birthDateAtom);
  const [birthLocationCode, setBirthLocationCode] = useAtom(
    birthLocationCodeAtom
  );

  const toast = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const actorWill: WILL = await createActor("will");
        const user: GetUserDetails = await actorWill.get_user_details();

        if ("userDetails" in user) {
          const firstNames = user.userDetails.firstNames.join(" ");

          const year = user.userDetails.birthDate.substring(0, 4);
          const month = user.userDetails.birthDate.substring(4, 6);
          const day = user.userDetails.birthDate.substring(6, 8);

          const principal = user.userDetails.principal.toText();

          setPrincipal(principal);
          setFirstNames(firstNames);
          setLastName(user.userDetails.lastName);
          setSex(user.userDetails.sex);
          setBirthDate(`${year}-${month}-${day}`);
          setBirthLocationCode(user.userDetails.birthLocationCode);

          setLoading(false);
        } else {
          setError(JSON.stringify(user.userNotExists));
        }
      } catch (err) {
        console.log("🚀 ~ file: user.ts:162 ~ fetchUserDetails ~ err:", err);
        setError(err as string);
        toast({
          title: "Error occured.",
          description: JSON.stringify(err),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    if (
      principal &&
      firstNames &&
      lastName &&
      sex &&
      birthDate &&
      birthLocationCode
    ) {
      console.log("User Fetching not running");
    } else {
      console.log("User Fetching running");

      fetchUserDetails();
    }
  }, []);

  return [
    principal,
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
    isLoading,
    error,
  ] as const;
}
