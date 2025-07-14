import { humanToE8s } from "@/utils/e8s";
import { CreateWillArgsU } from "./WillForm";
import { Principal } from "@dfinity/principal";

export function transferWillData(data: any): CreateWillArgsU {
  const willType = String(data.willType);
  const willName = String(data.willName);
  const willDescription = JSON.stringify(data.willDescription);
  const tokenTicker = String(data.tokenTicker);
  const amount = humanToE8s(data.amount)!;
  const heirs = Principal.fromText(data.heirs);
  const identifier = Number(data.identifier);

  return {
    willType,
    heirs,
    willName,
    willDescription,
    tokenTicker,
    identifier,
    amount,
  };
}
