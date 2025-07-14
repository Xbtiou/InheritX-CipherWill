import { WILL } from "@/configs/canistersService";
import { Will, _AzleResult } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import {
  convertIdentifierToIcpIdentifier,
  convertIdentifierToIcrcAddres,
  getP2PKHAddress,
} from "@/utils/identifier2Address";
import { showToast } from "@/utils/toast";
import { convertNanosecondsToDate } from "@/utils/utils";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export function useGetWill() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [will, setWill] = useState<Will | null>(null);
  const [timeStamp, setTimeStamp] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const toast = useToast();

  const fetchGetWill = async (identifier: number) => {
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const willDetailsResult: _AzleResult = await actorWill.get_will(
        identifier
      );
      console.log(
        "🚀 ~ file: useGetWill.ts:27 ~ fetchGetWill ~ willDetailsResult:",
        willDetailsResult
      );

      if ("Ok" in willDetailsResult) {
        setWill(willDetailsResult.Ok);
        setTimeStamp(
          String(
            convertNanosecondsToDate(Number(willDetailsResult.Ok.timeStamp))
          )
        );
        if (willDetailsResult.Ok.tokenTicker === "ICP") {
          const icpAddress = convertIdentifierToIcpIdentifier(identifier);
          setAddress(icpAddress);
        } else if (willDetailsResult.Ok.tokenTicker === "ckBTC") {
          const ckBTCAddress = convertIdentifierToIcrcAddres(identifier);
          console.log(
            "🚀 ~ file: useGetWill.ts:45 ~ fetchGetWill ~ ckBTCAddress:",
            ckBTCAddress
          );
          setAddress(ckBTCAddress);
        } else if (willDetailsResult.Ok.tokenTicker === "BTC") {
          const BTCAddress = await getP2PKHAddress(identifier);
          console.log(
            "🚀 ~ file: useGetWill.ts:57 ~ fetchGetWill ~ BTCAddress:",
            BTCAddress
          );

          setAddress(BTCAddress);
        }

        setLoading(false);
      } else {
        setLoading(false);

        showToast(
          toast,
          "Error Occured in Getting will Details",
          "",
          "error",
          "top"
        );
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
      setLoading(false);

      showToast(
        toast,
        "Error Occured in Getting will Details",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };
  return [will, fetchGetWill, isLoading, timeStamp, address] as const;
}
