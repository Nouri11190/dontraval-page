const express = require("express");
const { ethers } = require("ethers");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const { wallet, tokens } = require("./env");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static frontend files from backend/
app.use(express.static(path.join(__dirname)));

// Providers
const providers = {
  ETH: new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/1658ca7976aa40d6846582698b350ac2"),
  BSC: new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/"),
};

// Watch native coins
for (let [chain, provider] of Object.entries(providers)) {
  provider.on("block", async (blockNumber) => {
    const block = await provider.getBlockWithTransactions(blockNumber);
    block.transactions.forEach((tx) => {
      if (tx.to && tx.to.toLowerCase() === wallet.toLowerCase()) {
        io.emit("payment", {
          network: chain,
          type: "native",
          hash: tx.hash,
          amount: ethers.formatEther(tx.value),
        });
      }
    });
  });
}

// Watch ERC20 tokens
tokens.forEach((token) => {
  const provider = providers[token.network];
  const abi = ["event Transfer(address indexed from, address indexed to, uint value)"];
  const contract = new ethers.Contract(token.address, abi, provider);

  contract.on("Transfer", (from, to, value) => {
    if (to.toLowerCase() === wallet.toLowerCase()) {
      io.emit("payment", {
        network: token.network,
        type: token.symbol,
        from,
        amount: Number(value) / Math.pow(10, token.decimals),
      });
    }
  });
});

server.listen(3000, () => console.log("🚀 Backend + Dashboard live on port 3000"));
