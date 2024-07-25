import { VerificationLevel, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "./api/verify";
import nftIg from "./../../public/nft.jpg"
import Image from "next/image";
import React, { SetStateAction } from "react";
import {Card, CardHeader, CardFooter, Divider} from "@nextui-org/react";
import mintNFT from "../smartContractInteraction/mintNFT";
import {useState} from "react";

export default function verifyWithWorldIdToMintNFT() {

	let [NFTHashLink,setNFTHashLink] = useState ("not found");
	let [NFTHashText,setNFTHashText] = useState ("not found");
	let [hashColor,setTextColor] = useState ('red'); 

	function toggle(link: SetStateAction<string>){
		setNFTHashLink(link);
		setNFTHashText("View Your NFT");
		setTextColor('green');
	}
	
	if (!process.env.NEXT_PUBLIC_WLD_APP_ID) {
		throw new Error("app_id is not set in environment variables!");
	}
	if (!process.env.NEXT_PUBLIC_WLD_ACTION) {
		throw new Error("action is not set in environment variables!");
	}
	
	const onSuccess = async (result: ISuccessResult) => {
		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
		var mintNFTResult = await mintNFT();
		console.log("Minted NFT Hash: https://sepolia.etherscan.io/tx/" + mintNFTResult);
		window.alert("Successfully verified with World ID! Your NFT is Minted on sepolia testnet chain\nNFT Hash: " + mintNFTResult);
		toggle(process.env.NEXT_PUBLIC_SEPOLIA_LINK! + mintNFTResult);
	};

	const handleProof = async (result: ISuccessResult) => {
		console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
		const reqBody = {
			merkle_root: result.merkle_root,
			nullifier_hash: result.nullifier_hash,
			proof: result.proof,
			verification_level: result.verification_level,
			action: process.env.NEXT_PUBLIC_WLD_ACTION,
			signal: "",
		};
		console.log("Sending proof to backend for verification:\n", JSON.stringify(reqBody)) // Log the proof being sent to our backend for visibility
		const res: Response = await fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		})
		const data: VerifyReply = await res.json()
		if (res.status == 200) {
			console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
		} else {
			throw new Error(`Error code ${res.status} (${data.code}): ${data.detail}` ?? "Unknown error."); // Throw an error if verification fails
		}
	};
	return (
		<div>
			<div className="flex flex-col items-center justify-center align-middle h-screen">
				<Card className="border rounded-md" style={{width:300,marginTop:20,borderRadius:10}} >
				<CardHeader>
				<Image  src={nftIg} className="rounded-md" alt="NFT"/>
				</CardHeader>
				<Divider/>
				<CardFooter style={{margin:20,color:'#030a74'}}>
					<div  className="flex flex-col">
					<text style={{ fontSize:15, fontWeight:'bold'}}>
					<pre>{'Early Human #5481'}</pre></text>
					<text style={{ fontSize:12}}>
					<pre>{'Limited Edition Early Human Filter'}</pre></text>
					</div>
				</CardFooter>
				</Card>
				<Card style={{ width:300,fontSize:13,marginTop:10}} >
				<CardHeader style={{marginTop:10}}>
					<div  className="flex flex-col">
					<text style={{ fontWeight:'bold',color:'#030a74'}}>
					<pre>{'My NFTs on App'}</pre></text>
					<Image  src={nftIg} className="rounded-md" width={120} height={100} alt="NFT" style={{marginTop:5}}/>
					</div>
				</CardHeader>
				<Divider style={{marginTop:10}}/>
				<CardFooter style={{marginTop:10,color:'#030a74'}}>
				<div  className="flex flex-col">
					<div  className="flex flex-row">
					<text>
					<pre>{'Blockchain'}</pre></text>
					<text style={{ fontWeight:'bold'}}>
					<pre>{'                     Etheruem'}</pre></text>
					</div>
					<div  className="flex flex-row">
					<text>
					<pre>{'Token Standard'}</pre></text>
					<text style={{ fontWeight:'bold'}}>
					<pre>{'                 ERC-721'}</pre></text>
					</div>
					<div  className="flex flex-row">
					<text>
					<pre>{'Minted NFT                     '}</pre></text>
					<a href={NFTHashLink} style={{color: hashColor,fontWeight:'bold'}}>{NFTHashText}</a>
					</div>
				</div>
				</CardFooter>
				</Card>
				<IDKitWidget
					action={process.env.NEXT_PUBLIC_WLD_ACTION!}
					app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
					onSuccess={onSuccess}
					handleVerify={handleProof}
					verification_level={VerificationLevel.Device} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
				>
					{({ open }) =>
						<button onClick={open} className="rounded-full text-white font-bold" style={{ height:45,width:310,marginTop:30,background:'#030a74'}} >
						Verify with World ID to Mint NFT
						</button>
					}
				</IDKitWidget>
			</div>
		</div>
	);
}


