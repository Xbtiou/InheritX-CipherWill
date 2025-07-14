"use client";

import React, { useState } from "react";
import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/heroSection/HeroSection";
import { useAtom } from "jotai";
import { isConnectedAtom } from "@/state/jotai";
import {
  AbsoluteCenter,
  Box,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSignOut } from "@/hooks/useUtils/useSignOut";

const Home = (children: { children: React.ReactNode }) => {
  //atoms
  const [isConnected, setConnected] = useAtom(isConnectedAtom);

  //local states
  const [signingOut, setSigningOut] = useState<boolean>(false);

  //hooks
  const [clearStates] = useSignOut();

  const singOutWallet = async () => {
    console.log("Signing Out......");
    setSigningOut(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setConnected(false);
    clearStates();
    setSigningOut(false);
  };

  if (signingOut) {
    return (
      <Box minH="100vh" bg={useColorModeValue("gray.300", "gray.900")}>
        <AbsoluteCenter>
          <Spinner size="xl" />
        </AbsoluteCenter>
      </Box>
    );
  }

  return (
    <>
      {isConnected ? (
        <Header {...children} signOut={singOutWallet} />
      ) : (
        <HeroSection />
      )}
    </>
  );
};

export default Home;
