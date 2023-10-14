const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(1);

  const currentNumber = await contract.retrieve();
  console.log(`Current number is ${currentNumber}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedNumber = await contract.retrieve();
  console.log(`Updated number is ${updatedNumber}`);

  // const nonce = await wallet.getNonce();
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 100000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea264697066735822122093c821fba4cecee86ae830315b7b1beb779f44e89bb157ca838854728ca5820064736f6c63430008070033",
  //   chainId: 1337,
  // };

  // const sentTxResponse = await wallet.sendTransaction(tx);
  // console.log(sentTxResponse);
}

main();
