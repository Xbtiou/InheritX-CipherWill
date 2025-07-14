import { WILL } from "@/configs/canistersService";
import { ManualReply_4 } from "@/declarations/will/will.did";
import { createActor } from "@/services/createActor";
import { showToast } from "@/utils/toast";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export function useReportDeath() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [isDied, setIsDied] = useState<boolean>(false);

  ///atoms

  const toast = useToast();

  const reportDeath = async (identifier: number, base64Id: string) => {
    console.log(
      "🚀 ~ file: will.ts:369 ~ reportDeath ~ identifier:",
      identifier
    );
    try {
      setLoading(true);
      const actorWill: WILL = await createActor("will");

      const reportDeathResult: ManualReply_4 =
        await actorWill.report_death_by_base64Id(identifier, base64Id);
      console.log(
        "🚀 ~ file: useReportDeath.ts:27 ~ reportDeath ~ reportDeathResult:",
        reportDeathResult
      );
      if ("result" in reportDeathResult && reportDeathResult.result === true) {
        setLoading(false);
        setIsDied(true);

        showToast(toast, "Death Report Verified", "", "success", "top");
      } else {
        setLoading(false);
        // setIsDied(true);

        showToast(
          toast,
          "Death Report Not Verified",
          "",
          // JSON.stringify(reportDeathResult),
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
        "Error Occured in Reporting Death",
        JSON.stringify(error),
        "error",
        "top"
      );
    }
  };

  return [isDied, reportDeath, isLoading] as const;
}
