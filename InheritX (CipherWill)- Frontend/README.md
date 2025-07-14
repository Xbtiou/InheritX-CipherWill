# InheritX-UI

## Introduction

<i>
InheritX is a blockchain-based application developed on <b>Internet Computer (IC)</b> that allows users to create a digital will and bequeath their assets to designated beneficiaries in the event of their death.
</i>

### NOTE

- Users who have an [INSEE](https://www.insee.fr/en/accueil) number are eligible to use this application
- This repo contains Frontend Canister Code, for Backend Canisters code visit [InheritX](https://github.com/Xbtiou/InheritX-CipherWill/tree/main/InhertiX-CipherWill-Backend)

## Prerequisites

1. `DFX_VERSION= 0.15.1`
2. `AZLE_VERSION= 0.17.1`
3. `NodeJS_VERSION= 18.17.1`

## Setting Up and Running InheritX-UI Locally

- <h3>Follow steps below</h3>

1. Install Dependencies

   ```bash
   yarn install
   ```

2. Start Local Replica

   ```bash
    dfx start --clean
   ```

3. Deploy Canisters

   ```bash
   yarn deploy:local
   ```
