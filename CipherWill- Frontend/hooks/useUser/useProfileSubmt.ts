import { WILL } from "@/configs/canistersService";
import {
  userDetailsArgs,
  UpdateUserDetails,
  AddUserDetails,
} from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import {
  isUserExistsAtom,
  isProfileFormOpenAtom,
  principalAtom,
  firstNamesAtom,
  lastNameAtom,
  sexAtom,
  birthDateAtom,
  birthLocationCodeAtom,
} from "@/state/jotai";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

export function useProfileSubmit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setProfileResult] = useState<boolean>(false);

  //atom states
  const [isUserExists, setUserExists] = useAtom(isUserExistsAtom);
  const [, setError] = useState<string | null>(null);
  const [, setOpen] = useAtom(isProfileFormOpenAtom);
  const [, setPrincipal] = useAtom(principalAtom);
  const [, setFirstNames] = useAtom(firstNamesAtom);
  const [, setLastName] = useAtom(lastNameAtom);
  const [, setSex] = useAtom(sexAtom);
  const [, setBirthDate] = useAtom(birthDateAtom);
  const [, setBirthLocationCode] = useAtom(birthLocationCodeAtom);
  const toast = useToast();

  const profileSubmit = async (userDetails: userDetailsArgs) => {
    try {
      const actorWill: WILL = await createActor("will");
      if (isUserExists) {
        try {
          setLoading(true);
          const updateProfile: UpdateUserDetails =
            await actorWill.update_user_details(userDetails);
          console.log(
            "🚀 ~ file: user.ts:62 ~ submitProfile ~ updateProfile:",
            updateProfile
          );
          if ("success" in updateProfile && updateProfile.success === true) {
            setProfileResult(true);
            setLoading(false);
            setOpen(false);
            setUserExists(true);
            setPrincipal(null);
            setFirstNames(null);
            setLastName(null);
            setSex(null);
            setBirthDate(null);
            setBirthLocationCode(null);

            showToast(toast, "Profile Updated", "", "success", "top");
          } else {
            setLoading(false);
            setOpen(false);

            showToast(
              toast,
              `Error on Updating Profile`,
              String(Object.keys(updateProfile)[0]).toUpperCase(),
              "error",
              "top"
            );
          }
        } catch (error) {
          console.log("🚀 ~ file: user.ts:62 ~ submitProfile ~ error:", error);
          setError(error as string);
          setLoading(false);
          setOpen(false);

          toast({
            title: "Error occured while Updating Profile.",
            description: JSON.stringify(error),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        try {
          setLoading(true);

          const createProfile: AddUserDetails =
            await actorWill.add_user_details(userDetails);
          if ("success" in createProfile && createProfile.success === true) {
            setProfileResult(true);
            setLoading(false);
            setOpen(false);
            setUserExists(true);

            showToast(toast, "Profile Created!", "", "success", "top");
          } else {
            setLoading(false);
            setOpen(false);

            showToast(
              toast,
              `Error on Creating Profile`,
              String(Object.keys(createProfile)[0]).toUpperCase(),
              "error",
              "top"
            );
          }
        } catch (error) {
          console.log("🚀 ~ file: user.ts:98 ~ submitProfile ~ error:", error);
          setError(error as string);
          setLoading(false);
          setOpen(false);

          showToast(
            toast,
            `Error on Creating Profile`,
            JSON.stringify(error),
            "error",
            "top"
          );
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: user.ts:98 ~ submitProfile ~ error:", error);
      setError(error as string);
      setLoading(false);
      setOpen(false);

      showToast(
        toast,
        `Error on Submitting Profile`,
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };
  return [loading, profileSubmit] as const;
}
