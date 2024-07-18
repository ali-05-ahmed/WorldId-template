require("dotenv").config();
const {Web3} = require("web3");
const web3 = new Web3("https://sepolia.infura.io/v3/000345bee54842babc636ba80290f27d"); 
const abi = require("./abi/mintABI");

// const PRIVATE_KEY= process.env.PRIVATE_KEY;
// const contractAddress = process.env.MINT_CONTRACT_ADDRESS;
// const tokenId = process.env.TOKEN_ID;
const PRIVATE_KEY= '0x5be0346301906ac08a72ea7243afcb743d080b1cd245d189759a167e4d7aeee3';
const contractAddress = '0x35e0fE9f6145608AA4625AfCb3868c61aA1Dc4ae';

export default async function mintNFT() 
{
    const contract = new web3.eth.Contract(abi, contractAddress);
    const account = web3.eth.accounts.wallet.add(PRIVATE_KEY);
    const nonce = await web3.eth.getTransactionCount(account[0].address);
    const transaction = contract.methods.mintNFT(account[0].address);

    const txParams = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: await web3.eth.getGasPrice(),
        gasLimit: web3.utils.toHex(21000),
        from: account[0].address,
        //to: account[0].address,
        to: contractAddress,
        //value: web3.utils.toWei("0.000001", "ether"),
        data: transaction.encodeABI(),
    };
    //simple way
    const receipt = await web3.eth.sendTransaction(txParams);
    console.log("Transaction receipt:", receipt);

    //Other way
    //const signed  = await web3.eth.accounts.signTransaction(options,PRIVATE_KEY);
    //const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    //console.log(receipt); // print receipt
}
