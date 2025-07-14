#!/bin/bash

if [[ $# -lt 1 ]]; then
    echo "Argument 'local' or 'ic' expected, but found None. Continue with dev ..."
fi

ENV=$1

# checking ENV variable passed to deploy
if [[ $ENV == "local" ]]; then

    echo "Switching the deployment to local replica"

    #  transferring Some asset to Plug Account
    cd ../InheritX || bash

    dfx canister call icp_ledger icrc1_transfer '(record {  to = record {owner=principal "up5qv-6itp6-z5fuj-kfq2a-qohj4-ckibb-lq6tt-34j2c-i2d27-3gqlm-pqe";}; amount= 2_000_000_000 })'
    dfx canister call ckbtc_ledger icrc1_transfer '(record {  to = record {owner=principal "up5qv-6itp6-z5fuj-kfq2a-qohj4-ckibb-lq6tt-34j2c-i2d27-3gqlm-pqe";}; amount= 2_000_000_000 })'

    cd ../InheritX-UI || bash

    dfx canister uninstall-code 2222s-4iaaa-aaaaf-ax2uq-cai >/dev/null 2>&1
    dfx canister stop 2222s-4iaaa-aaaaf-ax2uq-cai >/dev/null 2>&1
    dfx canister delete 2222s-4iaaa-aaaaf-ax2uq-cai >/dev/null 2>&1

    bash scripts/pre_deploy_local.sh

    dfx deploy inheritX --specified-id 2222s-4iaaa-aaaaf-ax2uq-cai

    exit 0
fi

# checking ENV variable passed to deploy
if [[ $ENV == "ic" ]]; then

    echo "Switching the deployment to IC replica"

    bash scripts/pre_deploy_ic.sh

    dfx deploy --network ic inheritX

    exit 0
fi

# if ENV is dev or not provided (using as default node deployment)
echo "Switching the deployment to node dev"

#  transferring Some asset to Plug Account
cd ../InheritX || bash

dfx canister call icp_ledger icrc1_transfer '(record {  to = record {owner=principal "up5qv-6itp6-z5fuj-kfq2a-qohj4-ckibb-lq6tt-34j2c-i2d27-3gqlm-pqe";}; amount= 2_000_000_000 })'
dfx canister call ckbtc_ledger icrc1_transfer '(record {  to = record {owner=principal "up5qv-6itp6-z5fuj-kfq2a-qohj4-ckibb-lq6tt-34j2c-i2d27-3gqlm-pqe";}; amount= 2_000_000_000 })'

cd ../InheritX-UI || bash

bash scripts/pre_deploy_local.sh

yarn run dev
