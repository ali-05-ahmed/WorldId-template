import ig from "./../../public/kresuslogo.jpg"
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	return (
		<div>
			<div className="flex flex-col items-center justify-center align-middle h-screen">
				<Image  src={ig} width={150} alt="Kresus logo"/>
				<text style={{ fontSize:22,marginTop:20, color:'#030a74'}}>
				<pre>{'Verify Your Email\n to Get Started'}</pre></text>
				<input  className="border text-blue rounded-md" style={{ height:45,width:250,marginTop:20}} type='email' name="name" placeholder="  Enter Email" />
				<button onClick={() => router.push('./verificationCode')} className="rounded-full text-white font-bold" style={{ height:45,width:250,marginTop:220,background:'#030a74'}} >
				Get Verification Code
				</button>
			</div>
		</div>
	);
}
