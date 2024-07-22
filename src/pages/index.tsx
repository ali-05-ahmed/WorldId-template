import { VerificationLevel, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "./api/verify";
import mintNFT from "../smartContractInteraction/mintNFT";
import ig from "./../../public/kresuslogo.png"
import Image from "next/image";
import { SetStateAction, useState } from "react";

export default function Home() {

	let [NFTHashLink,setNFTHashLink] = useState (" not found");
	let [hashColor,setTextColor] = useState ('red'); 

	function toggle(link: SetStateAction<string>){
		setNFTHashLink(link);
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
		// window.alert("Successfully verified with World ID! Your nullifier hash is: " + result.nullifier_hash);
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
				<Image  src={ig} width={150} alt="Kresus logo"/>
				<br/>
				<p className="text-2xl mb-5">World ID X Kresus</p>
				<IDKitWidget
					action={process.env.NEXT_PUBLIC_WLD_ACTION!}
					app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
					onSuccess={onSuccess}
					handleVerify={handleProof}
					verification_level={VerificationLevel.Orb} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
				>
					{({ open }) =>
						<button className="border border-black rounded-md" onClick={open}>
							<div className="mx-3 my-1">Verify with World ID to Mint NFT</div>
						</button>
					}
				</IDKitWidget>
				<div style={{textAlign: 'center', marginTop:15}}>
					Minted NFT Hash : 
					<a href={NFTHashLink} style={{color: hashColor}}>{NFTHashLink}</a>
				</div>
			</div>
		</div>
	);
}
