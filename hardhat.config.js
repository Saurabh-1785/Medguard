require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables


module.exports = {
  solidity: "0.8.28", // Solidity version
  networks: {
    // Amoy Testnet configuration
    amoy: {
      url: "https://rpc-amoy.polygon.technology", // Amoy Testnet RPC URL
      accounts: [process.env.PRIVATE_KEY], // Use private key from .env file
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Hardhat's default local network
  },
},
};