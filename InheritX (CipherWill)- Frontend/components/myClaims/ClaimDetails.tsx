import { useBTCClaimWill } from "@/hooks/useBTC/useBTCClaimWill";
import { useCheckDeath } from "@/hooks/useWill/useCheckDeath";
import { useClaimWill } from "@/hooks/useWill/useClaimWill";
import { useGetWill } from "@/hooks/useWill/useGetWill";
import { useReportDeath } from "@/hooks/useWill/useReportDeath";
import { isClaimDetailsCloseAtom } from "@/state/jotai";
import { getBalance } from "@/utils/getBalance";
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
  useToast,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { PiCopySimpleLight } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";

function ClaimDetails() {
  //atoms
  const [isClaimDetailsClose, setIsClaimDetailsClose] = useAtom(
    isClaimDetailsCloseAtom
  );

  //local states
  const [address, setAddress] = useState<string | null>(null);
  const [isAddressValid, setValidAddress] = useState<boolean>(false);
  const [isReportDeathInput, setReportDeathInput] = useState<boolean>(false);
  const [base64Id, setBase64Id] = useState<string | null>(null);
  const [isClaimButtonLoading, setClaimButtonLoading] =
    useState<boolean>(false);
  const [isReportDeathButtonLoading, setReportDeathButtonLoading] =
    useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isbalanceReloading, setBalanceReloading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("Reload");

  //hooks
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();

  const [will, fetchGetWill, isLoading, timeStamp, icrc_BTC_Address] =
    useGetWill();
  const [claimWillFunc, useClaimWill_isLoading] = useClaimWill();
  const [claimBTCWill, useClaimBTCWill_isLoading] = useBTCClaimWill();
  const [isDied, reportDeathFunc, useReportDeath_isLoading] = useReportDeath();
  const [checkIsDied, checkDeath] = useCheckDeath();


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
      checkDeath(parseInt(identifier!));
    }
  }, []);

  useEffect(() => {
    if (isDied) {
      console.log("This UseEffect is running after reporting death");
      // seti
    }
  }, [isDied]);
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

  const handleReportDeathInput = (event: { target: { value: string } }) => {
    const url = event.target.value;
    if (
      typeof url === "string" &&
      url.includes("https://deces.matchid.io/id/")
    ) {
      // Use a regular expression to capture everything after "id/"
      const match = url.match(/\/id\/(.+)/);

      if (match && match[1]) {
        // match[1] contains the desired portion of the URL
        const desiredPart = match[1];
        console.log(
          "🚀 ~ file: ClaimDetails.tsx:53 ~ handleReportDeathInput ~ desiredPart:",
          desiredPart
        );

        if (desiredPart.length === 12) {
          setReportDeathInput(true);
          setBase64Id(desiredPart);
        } else {
          setReportDeathInput(false);
        }
      } else {
        setReportDeathInput(false);
        console.log("URL format not recognized");
      }
    } else {
      setReportDeathInput(false);
    }
  };
  const reportDeath = () => {
    console.log("Calling Report Death");
    if (identifier && base64Id) {
      console.log("Identifier and Base64Id Found for Report Death");
      setReportDeathButtonLoading(true);
      reportDeathFunc(parseInt(identifier!), base64Id);
      setReportDeathButtonLoading(false);
    } else {
      toast({
        title: "Error occured (Identifier or Base64 ID Missing...).",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (isClaimDetailsClose) {
    setIsClaimDetailsClose(false);

    router.push("/claims");
  }
  if (
    !will ||
    isLoading
    //  ||
    // useClaimWill_isLoading ||
    // useClaimBTCWill_isLoading
  ) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  const claimWill = () => {
    //check for ICRC
    if (will && will.identifier && ICRCASSETLIST.includes(will.tokenTicker)) {
      setClaimButtonLoading(true);
      claimWillFunc(will.identifier, "ICRC");
      setClaimButtonLoading(false);
    } else if (
      will &&
      will.identifier &&
      will.tokenTicker === "BTC" &&
      address
    ) {
      setClaimButtonLoading(true);
      claimBTCWill(will.identifier, "BTC", address);
      setClaimButtonLoading(false);
    } else {
      console.log("No will or other error occured");
    }
  };
  return (
    <>
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        className="mt-0 border-b-4 border-r-4 border-slate-400  shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0   py-0  focus:outline-none  flex flex-col justify-start items-start  w-full px-6 md:p-14"
      >
        {/* <Box>
          <h1 className="text-2xl  text-black font-semibold leading-6 ">
            Will Details
          </h1>
        </Box> */}
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
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
            >
              Token Ticker
            </Box>
            <Box as="p" className="text-lg text-slate-500  leading-4 ">
              {will.tokenTicker}
            </Box>
          </Box>
          <Box className="border-b-2 border-slate-400 shadow-lg p-4  flex justify-between w-full items-center">
            <Box
              as="p"
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
              className="font-bold text-lg font-serif text-slate-500 items-center  focus:outline-none"
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
        <Box className="flex justify-between w-full items-center mt-4">
          {(checkIsDied || isDied) && ICRCASSETLIST.includes(will.tokenTicker) && (
            <Button
            loadingText="Claiming..."
              isLoading={useClaimWill_isLoading}
              onClick={claimWill}
              as="button"
              isDisabled={useClaimWill_isLoading}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Claim
            </Button>
          )}

          {(checkIsDied || isDied) && will.tokenTicker === "BTC" && (
            <Button
            loadingText="Claiming..."
              onChange={handleInputAddressChange}
              isLoading={useClaimBTCWill_isLoading}
              onClick={claimWill}
              as="button"
              isDisabled={!isAddressValid}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Claim BTC
            </Button>
          )}
          {(checkIsDied || isDied) && will.tokenTicker === "BTC" && (
            <>
              <Input
                onChange={handleInputAddressChange}
                color="teal"
                placeholder="Enter BTC Address (P2PKH)"
                _placeholder={{ color: "inherit" }}
                className="text-blue-700 border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2   "
              />
            </>
          )}
          {!(checkIsDied || isDied) && (
            <>
              <Input
                className="font-serif text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-md   justify-between  focus:outline-none"
                isInvalid={!isReportDeathInput}
                placeholder="https://deces.matchid.io/id/rg_7nG6UoI_Y"
                onChange={handleReportDeathInput}
                isDisabled={useReportDeath_isLoading}
                width="auto"
              />
              <Button
                loadingText="Reporting..."
                isLoading={useReportDeath_isLoading}
                onClick={reportDeath}
                isDisabled={useReportDeath_isLoading}
                className="hover:border-r-0 font-serif bg-red-600 hover:bg-red-800 text-slate-200 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
              >
                Report User
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ClaimDetails;
