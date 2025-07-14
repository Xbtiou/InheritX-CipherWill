import { _SERVICE as _CKBTC } from "@/declarations/ckbtc/ckbtc";
import { _SERVICE as _ICRC } from "@/declarations/icrc";
import { _SERVICE as _PROVIDERS } from "@/declarations/providers";
import { _SERVICE as _WILL } from "@/declarations/will";
import { _SERVICE as _ICP } from "@/declarations/icp/icp";
import { _SERVICE as _BTC_CANISTER } from "@/declarations/bitcoin_canister";
import { ActorSubclass } from "@dfinity/agent";

type CKBTC = ActorSubclass<_CKBTC>;
type ICP = ActorSubclass<_ICP>;
type ICRC = ActorSubclass<_ICRC>;
type PROVIDERS = ActorSubclass<_PROVIDERS>;
type WILL = ActorSubclass<_WILL>;
type BTC_CANISTER = ActorSubclass<_BTC_CANISTER>;

export type { CKBTC, ICP, ICRC, PROVIDERS, WILL, BTC_CANISTER };
