-----

# CipherWill

-----

## Secure Your Digital Legacy with  (CipherWill)

 (also known as CipherWill) is an innovative **blockchain-based application** built on the **Internet Computer (ICP)**. It allows you to create a **digital will** for your crypto assets, ensuring that in the event of your passing, your designated beneficiaries seamlessly and securely receive their inheritance.

Currently,  (CipherWill) supports the following assets:

  * **Bitcoin (BTC)**
  * **ck-Bitcoin (ckBTC)**
  * **Internet Computer Protocol (ICP)**

-----

## Important Information

  * **Eligibility:** This application is exclusively available to users with an **INSEE number** or residents of **France**.
  * **Codebase Split:**  is divided into two repositories.

-----

## Getting Started

### Prerequisites

Before you can set up and run  (CipherWill) locally, ensure you have the following versions installed:

  * `AZLE_VERSION`: `0.17.1`
  * `NodeJS_VERSION`: `18.17.1`

### Local Setup Instructions

Follow these steps to get  (CipherWill) running on your local machine:

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

For detailed instructions on how to test  (CipherWill), please refer to the [TESTING.md](https://github.com/Xbtiou/-CipherWill/blob/main/InhertiX-CipherWill-Backend/TESTING.md) document.

-----

## License

This project is licensed under the **MIT License**. For more details, see the [LICENSE](https://github.com/Xbtiou/-CipherWill/blob/main/InhertiX-CipherWill-Backend/LICENSE.md) file.
