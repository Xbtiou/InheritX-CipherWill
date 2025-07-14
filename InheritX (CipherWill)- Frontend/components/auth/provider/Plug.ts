// Util
import { Identity } from "@dfinity/agent";
import { CANISTER_WHITE_LIST } from "@/utils/canisters";
import { humanToE8s } from "@/utils/e8s";

const host = process.env.NEXT_PUBLIC_IC_HOST;

export const createPlugLogin = () =>
  {
    return async () => {
      try {
        const isCreated = await isAgentCreated();
        if (isCreated) {
          const identity = (window as any).ic.plug.agent;
          // await handleAuthenticated(identity, authProvider)
          return;
        }

        //   showLoginMesg()

        const isConnected = await connectPlug();
        if (!isConnected) {
          console.log("createPlugLogin - Plug wallet connection was refused");
          // await handleAuthenticated(null, authProvider)
          return;
        }

        if (!(window as any).ic?.plug?.agent) {
          console.log("Failed to initialise the Agent");
          // await handleAuthenticated(null, authProvider)
          return;
        }

        console.log("Plug wallet is connected");

        const identity = (window as any).ic.plug.agent;
        //   await handleAuthenticated(identity, authProvider)
      } catch (e) {
        console.error("Error caught in createPlugLogin");
        console.error(e);
        //   await handleAuthenticated(null, authProvider)
      }
    };
  };
export async function plugPrincipal(): Promise<string> {
  if (await hasSession()) {
    return await (window as any).ic.plug.sessionManager.sessionData.principalId;
  } else {
    return "Please Login";
  }
}
export const isPlugConnected = async (): Promise<boolean> => {
  return await (window as any).ic?.plug?.isConnected();
};

export const isAgentCreated = async () => {
  return (
    (await (window as any).ic?.plug?.isConnected()) &&
    (window as any).ic?.plug?.agent != null
  );
};

export const hasSession = async (): Promise<boolean> => {
  return (window as any).ic?.plug?.sessionManager?.sessionData != null;
};

export const checkPlugUserAuth = async (
  options: { isCreateAgent: any },
  whitelist: string[] | undefined
): Promise<Identity | null> => {
  const isConnected = await (window as any).ic?.plug?.isConnected();

  if (!isConnected) {
    console.log("Plug is not connected");
    return null;
  }

  // Plug is connected here, check if agent is created
  // If not, create agent
  if (!(window as any).ic.plug.agent) {
    if (options?.isCreateAgent) {
      console.log(
        "Plug is connected: Agent not initialzied. Create agent now."
      );
      const hasAgent = await createAgent(CANISTER_WHITE_LIST);

      if (!hasAgent || !(window as any).ic.plug.agent) {
        const isConnected = await connectPlug();
        if (!isConnected || !(window as any).ic.plug.agent) {
          console.log("Problem in creating agent.");
          return null;
        }
      }
    } else {
      console.log("Plug is connected: Agent not initialzied.");
      return null;
    }
  }

  console.log("Plug agent identity available");

  const identity = (window as any).ic.plug.agent;
  return identity;
};

export const connectPlugForToken = async () =>
  // { showToast, toast, title }: any
  {
    const whitelist = CANISTER_WHITE_LIST;

    try {
      const isConnected = await (window as any).ic?.plug?.requestConnect({
        whitelist,
        host,
      });
      if (isConnected) {
        return true;
      }

      // showToast(
      //   toast,
      //   title,
      //   "Please install or unlock your Wallet first. If you switched to a new Plug Account or just installed Plug, reload this page.",
      //   "warning"
      // );
      return false;
    } catch (error) {
      if (String(error).includes("rejected")) {
        // showToast(
        //   toast,
        //   title,
        //   "The request for connecting your Plug Wallet was denied. Please try again.",
        //   "warning"
        // );
      } else {
        console.error(error);
      }

      return false;
    }
  };

export const connectPlug = async (): Promise<boolean> => {
  try {
    if (window.ic?.plug && "Plug and play!") {
      const whitelist = CANISTER_WHITE_LIST;
      console.log("🚀 ~ file: Plug.ts:147 ~ connectPlug ~ whitelist:", whitelist)
      try {
        const connect = await (window as any).ic?.plug?.requestConnect({
          whitelist,
          host,
          timeout: 50000,
        });
        console.log("🚀 ~ file: Plug.ts:148 ~ connect ~ connect:", connect);
        return await isPlugConnected();
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
export const disConnectPlug = async () => {
  try {
    await (window as any).ic?.plug?.disconnect();
  } catch (error) {
    console.log("🚀 ~ file: Plug.ts:154 ~ disConnectPlug ~ error:", error);
  }
};
const createAgent = async (
  CANISTER_WHITE_LIST?: string[]
): Promise<boolean> => {
  return await (window as any).ic?.plug?.createAgent({
    CANISTER_WHITE_LIST,
    host,
  });
};

export const verifyPlugWalletConnection = async (): Promise<boolean> => {
  const connected = await (window as any).ic?.plug?.isConnected();
  return connected ? true : false;
  // const whitelist = CANISTER_WHITE_LIST; //PlugConfig.whitelist

  // // Request connect if disconnected
  // if (!connected)
  //   await (window as any).ic.plug.requestConnect({ whitelist, host });

  // // Create agent if it is connected but agent is not created
  // if (connected) {
  //   console.log("Plug is connected");
  //   if (!(window as any).ic?.plug?.agent) {
  //     console.log("Plug agent is not created. Creating now...");
  //     await createAgent(whitelist);
  //   } else {
  //     console.log("Plug agent has been created");
  //   }
  // }
};

type PlugTransferParams = {
  to: string;
  amount: number;
};

export const transferICP = async (
  to: string,
  amount: number
): Promise<number> => {
  const escrowAmount: number = Number(humanToE8s(amount));

  const params: PlugTransferParams = {
    to,
    amount: escrowAmount,
  };

  // Request transfer from Plug
  const result = await (window as any).ic.plug.requestTransfer(params);
  return result.height;
};
