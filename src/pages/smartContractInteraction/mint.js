require("dotenv").config();
const  { Web3 } = require("web3");
const abi =require ("./abi/mintABI");

const privateKey = "0x5be0346301906ac08a72ea7243afcb743d080b1cd245d189759a167e4d7aeee3";
const contractAddress = "0x35e0fE9f6145608AA4625AfCb3868c61aA1Dc4ae";
const infuraAPI = "wss://sepolia.infura.io/ws/v3/000345bee54842babc636ba80290f27d";

export default async function mintNFT() 
{
    const web3 = new Web3(infuraAPI); 
    const contract = new web3.eth.Contract(abi, contractAddress);
    const account = web3.eth.accounts.wallet.add(privateKey);

    const gasEstimate = await contract.methods
      .mintNFT(account[0].address)
      .estimateGas({ from: account[0].address });
    console.log(gasEstimate);
    
    const encode = contract.methods.mintNFT(account[0].address).encodeABI();

    const txParams = {
        gas:gasEstimate,
        from: account[0].address,
        to: "0x35e0fE9f6145608AA4625AfCb3868c61aA1Dc4ae",
        data: encode,
    };
    const receipt = await web3.eth.sendTransaction(txParams);
    console.log("Transaction receipt:", receipt);
    return receipt.transactionHash;
}
