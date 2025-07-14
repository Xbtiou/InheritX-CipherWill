// import { blob, Principal } from '../../../src/lib';
import { BTC_CANISTER } from "@/configs/canistersService";
import { createActor } from "@/services/createActor";
import { encodeIcrcAccount } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { getCrc32 } from "@dfinity/principal/lib/esm/utils/getCrc";
import { sha224 } from "js-sha256";

export type Address = string;

export type blob = Uint8Array;

export function hexAddressFromPrincipal(
  principal: Principal,
  subaccount: number
): Address {
  return addressFromPrincipal(principal, subaccount);
}

export function addressFromPrincipal(
  principal: Principal,
  subaccount: number
): Address {
  const prefixBytes = new Uint8Array([
    10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100,
  ]); // \0xAaccount-id
  const principalBytes = principal.toUint8Array();
  const subaccountBytes = getSubAccountArray(subaccount);

  const hash = new Uint8Array(
    sha224
      .update([...prefixBytes, ...principalBytes, ...subaccountBytes])
      .digest()
  );
  const checksum = to32Bits(getCrc32(hash));

  return toHexString(new Uint8Array([...checksum, ...hash]));
}

export function getSubAccountArray(subaccount: number): number[] {
  return Array(28)
    .fill(0)
    .concat(to32Bits(subaccount ? subaccount : 0));
}

function to32Bits(number: number): number[] {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, number);
  return Array.from(new Uint8Array(b));
}

function toHexString(byteArray: Uint8Array): string {
  return Array.from(byteArray, (byte) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

export const convertIdentifierToIcpIdentifier = (
  identifier: number
): string => {
  console.log("🚀 ~ file: identifier2Address.ts:90 ~ identifier:", identifier);
  console.log(process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!);
  return hexAddressFromPrincipal(
    Principal.fromText(process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!),
    identifier
  );
};

export const convertIdentifierToIcrcAddres = (identifier: number) => {
  const subaccount = Uint8Array.from(getSubAccountArray(identifier));
  const owner = Principal.fromText(process.env.NEXT_PUBLIC_CANISTER_ID_ICRC!);

  return encodeIcrcAccount({ owner, subaccount });
};

export const getP2PKHAddress = async (identifier: number): Promise<string> => {
  try {
    if (identifier) {
      const actorBitcoinCanister: BTC_CANISTER = await createActor(
        "bitcoin_canister"
      );

      const addressResult = await actorBitcoinCanister.get_p2pkh_address(
        identifier
      );
      console.log(
        "🚀 ~ file: useGetP2PKHAddress.ts:17 ~ getP2PKHAddress ~ addressResult:",
        addressResult
      );

      // setAddress(addressResult);
      return addressResult;
    } else {
      console.log("Identifier Not Found");
      return "NULL";
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: useGetP2PKHAddress.ts:31 ~ getP2PKHAddress ~ error:",
      error
    );
    return String(error);
  }
};
