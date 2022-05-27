const { accounts, contract } = require("@openzeppelin/test-environment");


const TimeLockNonTransferablePool = artifacts.require("TimeLockNonTransferablePool");
const fetch = require("node-fetch");
const { execSync } = require("child_process");
const web3Utils = require("web3-utils");

const [owner, user1] = accounts;

const queryGasPrice = async () => {
  return new Promise((resolve, reject) => {
    fetch("https://ethgasstation.info/json/ethgasAPI.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const gasPriceData = Number(json.fast) / 10; // Gwei

        console.log(`Queried gas price: ${gasPriceData} Gwei`);
        resolve(Number(gasPriceData) * 10 ** 9);

        // Only for test
        // resolve(2000000000);
      })
      .catch((err) => {
        console.log(err);
        resolve(null);
      });
  });
};

const networkIdName = {
  1: "ethmainnet",
  3: "ropsten",
  4: "rinkeby",
  97: "bsctestnet",
  56: "bscmainnet",
};

const verifyCmd = (contractName, contractAddr, networkName) => {
  return `npx truffle run verify ${contractName}@${contractAddr} --network ${networkName}`;
};

// Verify and publish to etherscan
const execVerifyCmd = (contractName, contractAddr, networkName) => {
  // Ganache case
  if (!networkName) {
    return;
  }

  let RETRIES = 5;

  try {
    execSync(verifyCmd(contractName, contractAddr, networkName));
  } catch (err) {
    while (RETRIES > 0) {
      RETRIES--;
      try {
        execSync(verifyCmd(contractName, contractAddr, networkName));
        return;
      } catch (err2) {}
    }

    console.log(
      `Cannot publish contractName:${contractName}, contractAddr:${contractAddr} `
    );
    console.log("Error:", err);
  }
};

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    const networkId = await web3.eth.net.getId();
    const networkName = networkIdName[networkId];

    const deployerAccount = accounts[0];

    const oriBalance = await web3.eth.getBalance(deployerAccount);

    console.log(`Staking deployment started at ${new Date()}`);

    console.log(
      `Deployer account: ${deployerAccount}, balance: ${web3.utils.fromWei(
        oriBalance
      )} ETH`
    );

    let opts = {
      from: deployerAccount,
    };

    if (networkName === "ethmainnet") {
      const gasPrice = await queryGasPrice();

      opts = {
        ...opts,
        gasPrice,
      };
    }


    // Deploy Staked Pool Contract
    console.log(`Start deploy the Staking Contract`);
    const StakedPoolConract = await deployer.deploy(
      TimeLockNonTransferablePool,
      "Staked WARMIZ Token",                            // Token Name    
      "SWARMIZ",                                        // Token Symbol
      // "0x4E7442132eBCA4a6e1Ab15764082B3CBB384DE93",  // Testnet
      // "0x4E7442132eBCA4a6e1Ab15764082B3CBB384DE93",  // Testnet
      "0x9C8f9bdb032c0129Da74458a9C5CE93329973876",     // Deposit Token
      "0x9C8f9bdb032c0129Da74458a9C5CE93329973876",     // Reward Token
      "1000000000000000000",                            // Max Bonus
      "31536000",
      opts
    );

    // Verify and publish to etherscan
    execVerifyCmd("TimeLockNonTransferablePool", StakedPoolConract.address, networkName);
    console.log(`Staked TimeLockNonTransferablePool deployment ended at ${new Date()}`);

  });
};
