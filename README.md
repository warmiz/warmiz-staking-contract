# WARMIZ Staking smart contract

## Installation

`npm install`

## Compile contract

`npm run build`

  
## Deploy the contract to Ethereum
  - Create the file `.secret` containing the private key
  - Check/edit the input params in file `migrations/1_deployTimeLockNonTransferablePool.js`
    Parameters should be like
```sh
    "Staked WARMIZ Token",                            // Token Name    
    "SWARMIZ",                                          // Token Symbol
    "0x........................................",     // Deposit Token (This address should be a TRVL token address)
    "0x........................................",     // Reward Token  (This address should be a TRVL token address)
    "0",                                              // Max Bonus
    "315360000",
```
  - Run this cmd: `npx truffle migrate --reset --network ethmainnet`
  - Deploy on BSC testnet: `npx truffle migrate --reset --network bsctestnet`
