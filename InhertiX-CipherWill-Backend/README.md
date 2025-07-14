# InheritX (CipherWill)

## Secure Your Digital Legacy with InheritX (CipherWill)

InheritX (CipherWill) is an innovative **blockchain-based application** built on the **Internet Computer (ICP)**, designed to empower you to create a **digital will** for your crypto assets. In the unfortunate event of your passing, InheritX (CipherWill) ensures your designated beneficiaries receive their inheritance seamlessly and securely.

Currently, InheritX (CipherWill) supports the following assets:

  * **Bitcoin (BTC)**
  * **ck-Bitcoin (ckBTC)**
  * **Internet Computer Protocol (ICP)**

-----

## Important Information

  * **Eligibility:** This application is exclusively available to users with an **INSEE number** or residents of **France**.
  * **Codebase Split:** This repository contains the **backend canister code** for InheritX (CipherWill). For the frontend interface, please visit the [InheritX-UI repository](https://github.com/Xbtiou/InheritX-CipherWill/tree/main/InheritX%20(CipherWill)-%20Frontend).

-----

## Getting Started

### Prerequisites

Before you can set up and run InheritX (CipherWill) locally, ensure you have the following versions installed:

  * `DFX_VERSION`: `0.15.1`
  * `AZLE_VERSION`: `0.17.1`
  * `NodeJS_VERSION`: `18.17.1`

### Local Setup Instructions

Follow these steps to get InheritX (CipherWill) running on your local machine:

1.  **Install Dependencies:**
    ```bash
    yarn install
    ```
2.  **Download and Start Bitcoin Node:**
    ```bash
    yarn bitcoin_node:download && yarn bitcoin_node:start
    ```
3.  **Start Local Replica:**
    Open a **new terminal** and run:
    ```bash
    yarn dfx_start
    ```
4.  **Deploy Canisters:**
    Open another **new terminal** and run:
    ```bash
    yarn deploy
    ```

-----

## Testing

For detailed instructions on how to test InheritX (CipherWill), please refer to the [TESTING.md](TESTING.md) document.

-----

## License

This project is licensed under the **MIT License**. For more details, see the [LICENSE](https://github.com/mzurs/InheritX/blob/main/LICENSE) file.

-----