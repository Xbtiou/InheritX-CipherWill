"use client ";

import { isProfileFormOpenAtom } from "@/state/jotai";
import {
  AbsoluteCenter,
  Box,
  Button,
  Icon,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { ProfileForm } from "./ProfileForm";

import { useIsUserExists } from "@/hooks/useUser/useIsUserExists";

function CreateProfile() {
  const [isOpen, setOpen] = useAtom(isProfileFormOpenAtom);

  const openForm = () => {
    //atoms
    setOpen(true);
  };
  return isOpen ? (
    <Box>
      <ProfileForm />
    </Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Box className="flex items-center justify-between">
          <Box> </Box>
          <Box>
            <Button
              _hover={{
                bg: "#4b5563",
                color: "white",
              }}
              onClick={openForm}
              className="hover:border-r-0  font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
            >
              {/* GoPersonAdd */}
              <Icon fontSize="16" as={GoPersonAdd} /> &nbsp; Add Profile
            </Button>
          </Box>
        </Box>
      </Box>
      <AbsoluteCenter className="flex flex-col">
        <Image
          alt="User Not Found"
          height={100}
          width={100}
          src="./icons8-user-not-found-96.png"
        />
        <p className=" font-serif">Profile Not Found!</p>
      </AbsoluteCenter>
    </Box>
  );
}

function EditInformation({ children }: { children: React.ReactNode }) {
  //atoms
  const [isOpen, setOpen] = useAtom(isProfileFormOpenAtom);

  const openForm = () => {
    setOpen(true);
  };
  return isOpen ? (
    <Box>
      <ProfileForm />
    </Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Box className="flex items-center justify-between">
          <Box> </Box>
          <Box>
            <Button
              _hover={{
                bg: "#4b5563",
                color: "white",
              }}
              onClick={openForm}
              className="hover:border-r-0  font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
            >
              <Icon fontSize="16" as={FaUserEdit} /> &nbsp; Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
}

function ProfileNav({ children }: { children: React.ReactNode }) {
  //hooks
  const [isUserExists, isLoading, error] = useIsUserExists();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : isUserExists ? (
    <EditInformation children={children} />
  ) : (
    <CreateProfile />
  );
}

export default ProfileNav;
