require("dotenv").config();
const  { Web3 } = require("web3");
const abi =require ("./abi/nftABI");

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_HASH;
const infuraAPI = process.env.NEXT_PUBLIC_INFURA_API;
const nftIPFSHash = process.env.NEXT_PUBLIC_NFT_IPFS_HASH;

export default async function mintNFT() 
{
    const web3 = new Web3(infuraAPI); 
    const contract = new web3.eth.Contract(abi, contractAddress);
    const account = web3.eth.accounts.wallet.add(privateKey);

    const gasEstimate = await contract.methods
      .mintNFT(account[0].address,nftIPFSHash)
      .estimateGas({ from: account[0].address });
    console.log(gasEstimate);
    
    const encode = contract.methods.mintNFT(account[0].address,nftIPFSHash).encodeABI();

    const txParams = {
        gas:gasEstimate,
        from: account[0].address,
        to: contractAddress,
        data: encode,
    };
    const receipt = await web3.eth.sendTransaction(txParams);
    console.log("Transaction receipt:", receipt);
    return receipt.transactionHash;
}