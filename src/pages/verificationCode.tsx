import ig from "./../../public/kresuslogo.jpg"
import Image from "next/image";
import { useState } from "react";
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';

export default function VerificationCode() {
	const router = useRouter();
	const [otp, setOtp] = useState('');
	return (
		<div>
			<div className="flex flex-col items-center justify-center align-middle h-screen">
				<Image  src={ig} width={150} alt="Kresus logo"/>
				<text style={{ fontSize:22,marginTop:20, color:'#030a74'}}>
				<pre>{'Check Your Email'}</pre></text>
				<div style={{ fontSize:40,marginTop:20, color:'#030a74'}}>
				<OtpInput
					value={"425579"}
					onChange={setOtp}
					numInputs={6}
					shouldAutoFocus
					renderInput={(props) => <input {...props} />}
				/>
				</div>
				<text style={{ fontSize:13,marginTop:50, color:'#030a74'}}>
				<pre>{'   Security code sent to \n twoface03205622887@gmail.com'}</pre></text>
				<button className="rounded-full text-white font-bold" style={{ height:45,width:130,marginTop:20,background:'#030a74'}} >
				Resend Code
				</button>
				<button onClick={() => router.push('./designYourBadge')} className="rounded-full text-white font-bold" style={{ height:45,width:250,marginTop:100,background:'#030a74'}} >
				Confirm Code
				</button>
			</div>
		</div>
	);
}
