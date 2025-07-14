import { getAddressInfo } from "bitcoin-address-validation";

export function isP2PKHAddress(address: string) {
  const info = getAddressInfo(address);
  console.log(info);
  if (info.type == "p2pkh") {
    return true;
  } else {
    return false;
  }
}
