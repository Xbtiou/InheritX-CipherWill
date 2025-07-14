import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// this atom storage is used to cross check session and localstorage connection to avoid state lost at reloads
export const isConnectedAtom = atomWithStorage("isConnected", false);

// atom to check the current logged user is exists in a canister database
export const isUserExistsAtom = atom<boolean>(false);

//atom to check whether form is open or closed
export const isProfileFormOpenAtom = atom<boolean>(false);

//create Profile Atoms
export const principalAtom = atom<string | null>(null);
export const firstNamesAtom = atom<string | null>(null);
export const lastNameAtom = atom<string | null>(null);
export const sexAtom = atom<string | null>(null);
export const birthDateAtom = atom<string | null>(null);
export const birthLocationCodeAtom = atom<string | null>(null);

//atom to check whether create Will form is open or closed
export const isWillFormOpenAtom = atom<boolean>(false);

//atom for random identifier
export const identifierAtom = atom<null | number>(null);

//list of testator wills
export const testatorWillsAtom = atom<number[] | null>(null);

//list of heirs wills
export const heirsWillsAtom = atom<number[] | null>(null);

//atom to show claim details page or not
export const isClaimDetailsCloseAtom = atom<boolean>(false);

export const isDeleteDetailsCloseAtom = atom<boolean>(false);

//atom used for disclaimer popup
export const isDisClaimerOpenAtom = atom<boolean>(true);
