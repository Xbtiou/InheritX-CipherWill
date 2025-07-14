#!/bin/bash

echo "Pre Deployment for Local or Dev..."

ENV=$1

# Cleaning up folders
bash scripts/cleanup.sh

# copying local canister ids to canister_ids.json
cp -r ids/canister_ids_dev.json ids/canister_ids.json

# getting canisterIds
willCanisterId=$(jq '.will.local' ids/canister_ids.json)
providersCanisterId=$(jq '.providers.local' ids/canister_ids.json)
icrcCanisterId=$(jq '.icrc.local' ids/canister_ids.json)
btcCanisterId=$(jq '.bitcoin_canister.local' ids/canister_ids.json)
icpledgerCanisterId=$(jq '.icp_ledger.local' ids/canister_ids.json)
ckbtcledgerCanisterId=$(jq '.ckbtc_ledger.local' ids/canister_ids.json)

willVar="NEXT_PUBLIC_CANISTER_ID_WILL="$willCanisterId
providersVar="NEXT_PUBLIC_CANISTER_ID_PROVIDERS="$providersCanisterId
icrcVar="NEXT_PUBLIC_CANISTER_ID_ICRC="$icrcCanisterId
btcVar="NEXT_PUBLIC_CANISTER_ID_BTC="$btcCanisterId
icpVar="NEXT_PUBLIC_CANISTER_ID_ICP_LEDGER="$icpledgerCanisterId
ckBtcVar="NEXT_PUBLIC_CANISTER_ID_CKBTC_LEDGER="$ckbtcledgerCanisterId

# ic-host

icHost="http://localhost:8080"

icHostVar="NEXT_PUBLIC_IC_HOST="$icHost

# Assigning Variables to Environment Variable
echo $icHostVar >.env

{

    echo "$willVar"
    echo "$providersVar"
    echo "$icrcVar"
    echo "$btcVar"
    echo "$icpVar"
    echo "$ckBtcVar"

} >>.env

echo "Pre Deployment Configs For Local or Dev Completed!"
