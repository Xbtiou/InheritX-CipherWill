import {
  isUserExistsAtom,
  isProfileFormOpenAtom,
  principalAtom,
  firstNamesAtom,
  lastNameAtom,
  sexAtom,
  birthDateAtom,
  birthLocationCodeAtom,
  identifierAtom,
  testatorWillsAtom,
  heirsWillsAtom,
  isConnectedAtom,
  isClaimDetailsCloseAtom,
  isDeleteDetailsCloseAtom,
} from "@/state/jotai";
import { useAtom } from "jotai";

export const useSignOut = () => {
  //all atom states
  const [, setUserExists] = useAtom(isUserExistsAtom);
  const [, setOpen] = useAtom(isProfileFormOpenAtom);
  const [, setPrincipal] = useAtom(principalAtom);
  const [, setFirstNames] = useAtom(firstNamesAtom);
  const [, setLastName] = useAtom(lastNameAtom);
  const [, setSex] = useAtom(sexAtom);
  const [, setBirthDate] = useAtom(birthDateAtom);
  const [, setBirthLocationCode] = useAtom(birthLocationCodeAtom);
  const [, setIdentifier] = useAtom(identifierAtom);
  const [, setTestatorWills] = useAtom(testatorWillsAtom);
  const [, setHeirsWills] = useAtom(heirsWillsAtom);
  const [, setConnected] = useAtom(isConnectedAtom);
  const [, setIsClaimDetailsClose] = useAtom(isClaimDetailsCloseAtom);
  const [, setIsDeleteDetailsClose] = useAtom(isDeleteDetailsCloseAtom);
  const clearStates = () => {
    console.log("SignOut All States...");

    setUserExists(false);
    setBirthDate(null);
    setBirthLocationCode(null);
    setPrincipal(null);
    setFirstNames(null);
    setLastName(null);
    setOpen(false);
    setSex(null);
    setIdentifier(null);
    setTestatorWills(null);
    setHeirsWills(null);
    setConnected(false);
    setIsClaimDetailsClose(false);
    setIsDeleteDetailsClose(false);
    console.log("All States are cleared!");
  };
  return [clearStates] as const;
};
