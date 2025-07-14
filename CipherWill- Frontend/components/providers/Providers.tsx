"use client";
import React from "react";
import { Provider as JotaiProvider } from "jotai";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

function Providers(props: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <CacheProvider>
        <ChakraProvider>{props.children}</ChakraProvider>
      </CacheProvider>
    </JotaiProvider>
  );
}

export default Providers;
