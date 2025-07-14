// import { useDeleteWill, useGetWill } from "@/hooks/will";
import { useBTCDeleteWill } from "@/hooks/useBTC/useBTCDeleteWill";
import { useDeleteWill } from "@/hooks/useWill/useDeleteWill";
import { useGetWill } from "@/hooks/useWill/useGetWill";
import { isDeleteDetailsCloseAtom } from "@/state/jotai";
import { ICRCASSETLIST, truncatePrincipal } from "@/utils/utils";
import { isP2PKHAddress } from "@/utils/validateP2PKHAddress";
import {
  AbsoluteCenter,
  Box,
  Button,
  Icon,
  Input,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiCopySimpleLight } from "react-icons/pi";
import { IoCheckmarkDone } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { getBalance } from "@/utils/getBalance";

function WillDetails() {
  //atoms
  const [isDeleteDetailsClose, setIsDeleteDetailsClose] = useAtom(
    isDeleteDetailsCloseAtom
  );
  //local states
  const [isDeleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);

  //hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  const [will, fetchGetWill, isLoading, timeStamp, icrc_BTC_Address] =
    useGetWill();
  const [deleteWillFunc, useDeleteWill_isLoading] = useDeleteWill();
  const [deleteBTCWill, useBTCDeleteWill_isLoading] = useBTCDeleteWill();

  const [address, setAddress] = useState<string | null>(null);
  const [isAddressValid, setValidAddress] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isbalanceReloading, setBalanceReloading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("Reload");

  const identifier = searchParams.get("id");

  const fetchBalance = async () => {
    if (will && will.tokenTicker && will.identifier) {
      setBalanceReloading(true);
      const balance = await getBalance(will.tokenTicker, will.identifier);
      setBalance(balance);
      setBalanceReloading(false);
    } else {
      console.log("Will Object Not Found");
    }
  };

  const copyText = () => {
    setIsCopied(true);
    if (will?.tokenTicker === "BTC") {
      navigator.clipboard.writeText(String(icrc_BTC_Address));
    } else {
      navigator.clipboard.writeText(String(icrc_BTC_Address));
    }
  };

  useEffect(() => {
    if (identifier) {
      console.log("parseInt(identifier!)", parseInt(identifier!));
      fetchGetWill(parseInt(identifier!));
    }
  }, []);
  if (isDeleteDetailsClose) {
    setIsDeleteDetailsClose(false);
    router.push("/wills");
  }

  if (
    !will ||
    isLoading

  ) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  const handleInputAddressChange = (event: any) => {
    try {
      const address = event.target.value;

      const isValid = isP2PKHAddress(address);
      if (isValid) {
        setAddress(address);
        setValidAddress(true);
      } else {
        console.log("Address Not Valid: ", address);
        setAddress(null);
        setValidAddress(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: willDetails.tsx:74 ~ handleInputAddressChange ~ error:",
        error
      );
      setAddress(null);
      setValidAddress(false);
    }
  };

  const deleteWill = () => {
    //check for ICRC
    if (will && will.identifier && ICRCASSETLIST.includes(will.tokenTicker)) {
      setDeleteButtonLoading(true);
      deleteWillFunc(will.identifier, "ICRC");
      setDeleteButtonLoading(false);
    } else if (
      will &&
      will.identifier &&
      will.tokenTicker === "BTC" &&
      address
    ) {
      setDeleteButtonLoading(true);
      deleteBTCWill(will.identifier, "BTC", address);
      setDeleteButtonLoading(false);
    } else {
      console.log("No will  or other error occured");
    }
  };
  return (
    <>
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        className="mt-0 border-b-4 border-r-4 border-slate-400  shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0   py-0  focus:outline-none  flex flex-col justify-start items-start  w-full px-6 md:p-14"
      >
      
        <Box className="flex mt-7 flex-col items-end w-full space-y-6">
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Title
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {will.willName}
            </Box>
          </Box>
          {/* <Box className="flex justify-between w-full items-center"> */}
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              // className="text-lg text-black leading-4 "

              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Description
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {will.willDescription}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Identifier
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {will.identifier}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Testator
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {truncatePrincipal(will.testator.toString())}
            </Box>
          </Box>{" "}
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Heir
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {truncatePrincipal(will.heirs.toString())}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Date
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {String(timeStamp)}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Token
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {will.tokenTicker}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Address
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {truncatePrincipal(String(icrc_BTC_Address))}{" "}
              <Icon
                onClick={copyText}
                as={!isCopied ? PiCopySimpleLight : IoCheckmarkDone}
                className="ml-4"
              />
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold  text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Amount
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {balance}
              {isbalanceReloading ? (
                <Spinner size="sm" ml={4} />
              ) : (
                <Icon onClick={fetchBalance} as={TfiReload} className="ml-4" />
              )}
            </Box>
          </Box>
        </Box>
        {ICRCASSETLIST.includes(will.tokenTicker) && (
          <Box className="flex mt-0 flex-col items-end w-full space-y-2">
            <Box className="flex justify-between w-full items-center mt-6">
              <Button
                loadingText="Deleting..."
                isLoading={useDeleteWill_isLoading}
                onClick={deleteWill}
                as="button"
                className="hover:border-r-0 font-serif bg-red-600 hover:bg-red-800 text-slate-200 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded   justify-between  px-6  py-3  focus:outline-none"
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
        {will.tokenTicker === "BTC" && (
          <Box className="flex mt-0 flex-col items-end w-full space-y-2">
            <Box className="flex justify-between w-full items-center mt-6">
              <Button
                loadingText="Deleting..."
                isDisabled={!isAddressValid}
                isLoading={useBTCDeleteWill_isLoading}
                onClick={deleteWill}
                as="button"
                className="hover:border-r-0 font-serif bg-red-600 hover:bg-red-800 text-slate-200 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded   justify-between px-6 py-3  focus:outline-none"
              >
                Delete
              </Button>

              <Input
                isDisabled={useBTCDeleteWill_isLoading}
                onChange={handleInputAddressChange}
                color="teal"
                placeholder="Enter BTC Address (P2PKH)"
                _placeholder={{ color: "inherit" }}
                className="ml-4 font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md  text-center justify-between  focus:outline-none"
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default WillDetails;
