"use client";

import { useUserInfo } from "@/hooks/useUser/useUserInfo";
import { useTotalWillsC, useTotalWillsT } from "@/hooks/useWill/useTotalWill";
import ckBTCLogo from "@/public/ckbtc.svg";
import icpLogo from "@/public/icp.svg";
import { getWalletBalance } from "@/utils/getBalance";
import { addressFromPrincipal } from "@/utils/identifier2Address";
import { truncatePrincipal } from "@/utils/utils";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { Principal } from "@dfinity/principal";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [principal, setPrincipal] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [icpBalance, setICPBalance] = useState<string>("0");
  const [ckBTCBalance, setckBTCBalance] = useState<string>("0");

  const [heirsWillsCount, fetchHeirsWillsCount, isLoadingC, errorC] =
    useTotalWillsC();
  const [testatorWillsCount, fetchTestatorWillsCount, isLoadingT, errorT] =
    useTotalWillsT();
  const [
    principalUser,
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
    isLoading,
    error,
  ] = useUserInfo();

  useEffect(() => {
    const requestPlugPrincipal = async () => {
      try {
        setPrincipal(
          truncatePrincipal((await window.ic.plug.getPrincipal()).toString())!
        );
        setAddress(
          truncatePrincipal(
            addressFromPrincipal(
              Principal.fromText(
                (await window.ic.plug.getPrincipal()).toString()!
              ),
              0
            )
          )!
        );
        setckBTCBalance(
          await getWalletBalance(
            "ckBTC",
            Principal.fromText(
              (await window.ic.plug.getPrincipal()).toString()!
            )
          )
        );
        setICPBalance(
          await getWalletBalance(
            "ICP",
            Principal.fromText(
              (await window.ic.plug.getPrincipal()).toString()!
            )
          )
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: page.tsx:40 ~ requestPlugPrincipal ~ error:",
          error
        );
      }
    };
    requestPlugPrincipal();
    fetchHeirsWillsCount();
    fetchTestatorWillsCount();
  }, []);

  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.900")}
      className="border-b-0 border-r-4 border-slate-400  shadow-sm "
    >
      <Box className="  font-sans text-slate-500 border-b-2  border-slate-400  shadow-sm rounded-sm    px-3 py-3  focus:outline-none  sm:mx-0 mt-0 flex justify-between shadow-indigo-500/40">
        <Heading className="text-slate-700 px-5 lg:text-5xl text-3xl mb-0 mt-10 font-bold font-serif">
          Hello{lastName ? `, ${lastName}` : ""}!
        </Heading>

        <Box className="font-mono  text-slate-900  grid justify-items-end font-extralight gap-y-4 text-md">
          <Box>Principal: {principal}</Box>
          <Box>Account ID: {address}</Box>
        </Box>
      </Box>

      <Box className=" font-sans  border-b-4  border-slate-400  shadow-md rounded-sm     focus:outline-none  mt-0  shadow-indigo-500/40">
        <Box className="  font-sans text-slate-500 border-b-0  border-slate-400  shadow-sm rounded-sm   px-3 py-3  focus:outline-none  sm:mx-0 mt-0 flex justify-between shadow-indigo-500/40">
          <Heading className="underline text-slate-700 px-5   text-xl lg:text-3xl mb-0 mt-5 font-bold font-sans">
            Balance
          </Heading>

          <Box className="font-mono  text-slate-900  grid justify-items-end font-extralight gap-y-5 text-md">
            <Box className="flex flex-row-1 gap-4">
              <Image
                className=""
                height={35}
                width={35}
                alt="ckBTC"
                src={icpLogo}
              />

              <Box className="mb-0 text-slate-700"> &nbsp; {icpBalance}</Box>
            </Box>

            <Box className="flex flex-row-1 justify-start gap-4 ">
              <Image
                className="pr-2"
                height={35}
                width={35}
                alt="ckBTC"
                src={ckBTCLogo}
              />
              <Box className="mb-0 text-slate-700">&nbsp;{ckBTCBalance}</Box>
            </Box>
          </Box>
        </Box>

        <Box className="mb-32 sm:mb-36 mt-24 grid grid-cols-1 grid-rows-1  content-between ">
          <Box className=" flex flex-row  gap-x-40 gap-y-50 justify-center  ">
            <Box
              bg={useColorModeValue("gray.300", "gray.900")}
              className=" flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-48 font-sans text-slate-500 border-b-4  border-slate-400  shadow-md rounded-xl shadow-indigo-500/40   sm:ml-3  sm:mt-0 sm:m-0  px-3 py-3  focus:outline-none"
            >
              <h2 className="lg:text-5xl font-serif md:text-4xl text-lg font-extrabold leading-10 text-center text-gray-800">
                {testatorWillsCount}
              </h2>
              <p className="mt-4 font-bold font-sans   text-sm md:text-base lg:text-lg leading-none text-center text-slate-700">
                Wills
              </p>
            </Box>
            <Box
              bg={useColorModeValue("gray.300", "gray.900")}
              className=" flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-48   font-sans text-slate-500 border-b-4  border-slate-400  shadow-md rounded-xl shadow-indigo-500/40   sm:ml-3  sm:mt-0 sm:m-0  px-3 py-3  focus:outline-none"
            >
              <h2 className="lg:text-5xl font-serif md:text-4xl text-lg font-extrabold leading-10 text-center text-gray-800">
                {heirsWillsCount}
              </h2>
              <p className="mt-4 font-bold font-sans text-sm md:text-base lg:text-lg leading-none text-center text-slate-700">
                Claims
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
