import  { IDL } from "@dfinity/candid";


export const actorPlug = async (
  canisterId: string,
  idlFactory: IDL.InterfaceFactory
) => {
  // Fetch root key for certificate validation during local IC connection
  if (process.env.NEXT_PUBLIC_IC_HOST?.includes("localhost")) {
    console.log("Plug: Fetching root key for local dev");
    await window.ic?.plug?.agent?.fetchRootKey();
  }

  return await window.ic?.plug?.createActor({
    canisterId,
    interfaceFactory: idlFactory,
  });
};
