import { useGetBTCBalance } from "@/hooks/useBTC/useGetBTCBalance";
import { useGetP2PKHAddress } from "@/hooks/useBTC/useGetP2PKHAddress";
import { BTCLogo } from "@/icon";
import { identifierAtom, isWillFormOpenAtom } from "@/state/jotai";
import { Box, Button, Center, Icon } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

export default function DepositBTCForm({
  identifier,
}: {
  identifier: number | null;
}) {
  const router = useRouter();

  const [, setOpen] = useAtom(isWillFormOpenAtom);
  const [, setIdentifier] = useAtom(identifierAtom);

  const [isDisableButton, setDisableButton] = useState<boolean>(false);

  const [balance, getBTCBalance] = useGetBTCBalance();

  const [address, getP2PKHAddress] = useGetP2PKHAddress();

  const updateDelayStateAfterDelay = () => {
    setTimeout(() => {
      setDisableButton(false);
    }, 30000); // 30 seconds (30,000 milliseconds)
  };

  const copyText = () => {
    navigator.clipboard.writeText(address);
  };

  const getBalance = async () => {
    if (identifier) {
      console.log(
        "🚀 ~ file: DepositBTCForm.tsx:37 ~ getBalance ~ identifier:",
        identifier
      );
      setDisableButton(true);
      getBTCBalance();
      updateDelayStateAfterDelay();
    }
  };

  const getAddress = async () => {
    if (identifier) {
      setDisableButton(true);
      getP2PKHAddress();
      updateDelayStateAfterDelay();
    }
  };

  const goToHome = async () => {
    setOpen(false);
    setIdentifier(null);
    router.push("/wills");
  };
  useEffect(() => {
    getP2PKHAddress();
  }, []);
  return (
    <>
      <Box className="bg-transparent w-full sm:px-6">
        <Box className=" relative  md:px-10  py-[10%]  rounded-tl-lg rounded-tr-lg">
          <Center>
            <Box className="font-sans text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none">
              <Box className="p-6 text-center">
                <h1 className="underline font-serif text-4xl font-extrabold mb-5  text-slate-700">
                  Deposit{" "}
                </h1>

                <Center>
                  {" "}
                  <Icon
                    className="bg-transparent"
                    width={"auto"}
                    height={"auto"}
                    as={BTCLogo}
                  />
                </Center>
                <br />

                <h3 className="font-bold text-lg  text-slate-700">
                  BTC Address (P2PKH){" "}
                </h3>
                <br />
                <h3 className="mb-0 text-lg font-normal text-slate-600">
                  <div className="flex w-full">
                    <div className="relative mb-3 w-full">{address}</div>
                  </div>
                </h3>
                <div>
                  <Button
                    onClick={copyText}
                    type="button"
                    className="hover:border-x-0 font-sans text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                  >
                    Copy
                  </Button>{" "}
                  <Button
                    isDisabled={isDisableButton}
                    onClick={getAddress}
                    className="hover:border-r-0 font-sans text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                  >
                    <Icon as={FiRefreshCcw} />
                    &nbsp; Load
                  </Button>
                </div>
                <br />
                <h3 className="font-bold text-lg  text-slate-700">Balance</h3>
                <h3 className="text-lg font-normal text-gray-500">{balance}</h3>

                <br />
                <Button
                  onClick={goToHome}
                  className="hover:border-r-0 font-sans bg-green-600 hover:bg-green-800 text-slate-200 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                >
                  Go Home
                </Button>
                <Button
                  isDisabled={isDisableButton}
                  onClick={getBalance}
                  className="hover:border-r-0 font-sans text-slate-500 border-b-4 border-r-4 border-slate-400 items-center shadow-lg shadow-indigo-500/40 rounded  sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3  focus:outline-none"
                >
                  <Icon as={FiRefreshCcw} />
                  &nbsp; Refresh
                </Button>
              </Box>
            </Box>
          </Center>
        </Box>
      </Box>
    </>
  );
}
