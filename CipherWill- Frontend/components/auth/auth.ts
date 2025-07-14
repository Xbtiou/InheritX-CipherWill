import { useAtomValue } from "jotai";
import {
  connectPlug,
  isPlugConnected,
  verifyPlugWalletConnection,
} from "./provider/Plug";
import { isConnectedAtom } from "@/state/jotai";

export async function connectWallet() {
  const walletProvider = "Plug";

  switch (walletProvider) {
    case "Plug":
      return await connectPlug();

    // Add other wallets providers below

    default:
      console.log("No Wallet Found");
      return false;
  }
}

export async function verifyWalletConnection(): Promise<boolean> {
  const walletProvider = "Plug";

  switch (walletProvider) {
    case "Plug":
      return await verifyPlugWalletConnection();
    default:
      console.log("No Wallet Found");
      return false;
  }
}

export async function checkConnection(
  isStorageConnected: boolean
): Promise<boolean> {
  const walletProvider = "Plug";

  switch (walletProvider) {
    case "Plug":
      return (await isPlugConnected()) && isStorageConnected;
    default:
      console.log("No Wallet Found");
      return false;
  }
}
