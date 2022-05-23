require("babel-register");
require("@babel/polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const path = require("path");

module.exports = {
  contracts_directory: "contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://ropsten.infura.io/v3/34b8cb070feb45619332c8867301bdaa"
          // "wss://ropsten.infura.io/ws/v3/34b8cb070feb45619332c8867301bdaa"
          // "https://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
          "wss://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
        );
      },
      network_id: 3,
      confirmations: 3,
      websocket: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gas: 200000000,
      gasPrice: 2000000000, // 2 Gwei
    },
    rinkeby: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://ropsten.infura.io/v3/34b8cb070feb45619332c8867301bdaa"
          "wss://rinkeby.infura.io/ws/v3/0b31c4e492e64acc86ab55fd05d5c415"
          // "https://eth-ropsten.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
          //"wss://eth-rinkeby.alchemyapi.io/v2/uPrNsttftKyrZIputd80GsfzXar-NAL3"
        );
      },
      network_id: 4,
      confirmations: 3,
      websocket: true,
      timeoutBlocks: 150000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      // gas: 30000000,
      // gasPrice: 20000000000, // 20 Gwei
    },
    ethmainnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          // "https://mainnet.infura.io/v3/34b8cb070feb45619332c8867301bdaa"
          // "wss://mainnet.infura.io/ws/v3/34b8cb070feb45619332c8867301bdaa"
          // "https://eth-mainnet.alchemyapi.io/v2/ccd5do8Kqn7QHjkrx74pwwlgzo10Rtvh"
          "wss://eth-mainnet.alchemyapi.io/v2/ccd5do8Kqn7QHjkrx74pwwlgzo10Rtvh"
        );
      },
      network_id: 1,
      confirmations: 3,
      websocket: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gas: 2000000,
    },
    bsctestnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          "https://data-seed-prebsc-1-s1.binance.org:8545/"
          // "https://data-seed-prebsc-1-s3.binance.org:8545/"
        );
      },
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gasPrice: 10000000000,
    },
    bscmainnet: {
      provider: () => {
        const privatekey = fs
          .readFileSync(`${path.dirname(__filename)}/.secret`)
          .toString();
        return new HDWalletProvider(
          privatekey,
          "https://bsc-dataseed.binance.org/"
          // "https://bsc-dataseed4.defibit.io/"
        );
      },
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
      skipDryRun: true,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.7",
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: ["truffle-plugin-verify","solidity-coverage"],
  api_keys: {
    etherscan: "KCUPM62T94YYXRK6KJFK3VMHVBRASKTHVR",
    bscscan: "3J3WPPW72ACTIR9XZA3DAQXGKUMA7Z8YRI",
  },
};
