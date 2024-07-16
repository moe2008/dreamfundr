require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [`0x${process.env.PRIVATE_KEY}`],
          providerOrUrl: process.env.API_URL,
        }),
      network_id: 17000,
      gas: 20000000,
      gasPrice: 100000000,
      confirmations: 2,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
