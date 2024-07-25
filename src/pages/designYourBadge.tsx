import ig from "./../../public/kresuslogo.jpg"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";


export default function designYourBadge() {
	const router = useRouter();
	return (
		<div>
			<div className="flex flex-col items-center justify-center align-middle h-screen">
				<Image  src={ig} width={150} alt="Kresus logo"/>
				<text style={{ fontSize:22,marginTop:20, color:'#030a74'}}>
				<pre>{'  Design Your \n Exclusive Badge'}</pre></text>
				<Card className="border rounded-md" style={{ width:320,fontSize:13,marginTop:20}} >
				<CardHeader style={{margin:15}}>
					<div  className="flex flex-row">
					<text style={{ fontWeight:'bold',color:'#030a74'}}>
					<pre>{'STEP 1'}</pre></text>
					<text style={{ color:'#030a74'}}>
					<pre>{'  Select a photo'}</pre></text>
					</div>
				</CardHeader>
				<Divider/>
				<CardBody style={{margin:15}}>
					<div  className="flex flex-row">
					<text style={{ fontWeight:'bold',color:'#030a74'}}>
					<pre>{'STEP 2'}</pre></text>
					<text style={{ color:'#030a74'}}>
					<pre>{'  Customize it with the Early\n  Human filter'}</pre></text>
					</div>
				</CardBody>
				<Divider/>
				<CardFooter style={{margin:15}}>
					<div  className="flex flex-row">
					<text style={{ fontWeight:'bold',color:'#030a74'}}>
					<pre>{'STEP 3'}</pre></text>
					<text style={{ color:'#030a74'}}>
					<pre>{'  Mint it and unlock perks and\n  rewards'}</pre></text>
					</div>
				</CardFooter>
				</Card>
				<button onClick={() => router.push('./verifyWithWorldIdToMintNFT')} className="rounded-full text-white font-bold" style={{ height:45,width:250,marginTop:50,background:'#030a74'}} >
				Begin Minting
				</button>
			</div>
		</div>
	);
}


