import { Link } from "react-router-dom";
import LandingImage from "/LandingImage.jpg";
import Mockup from "/DarkDriveMockup.png";
import Card from "../components/Card";

const Home = () => {
	return (
		<>
			<span
				style={{
					backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${LandingImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className='grid lg:grid-cols-2 p-8 lg:gap-32 sm:px-16 bg-cover bg-center items-center mt-22'
			>
				<div className='flex flex-col items-center justify-center gap-8 bg-white/10 backdrop-blur-sm p-8 sm:p-16 text-center rounded-lg'>
					<h1 className='font-display text-background'>Welcome To DarkDrive</h1>
					<h2 className='text-background'>
						Your Files. Your Rules. With end-to-end encryption built in, your files are locked
						down—only you hold the key. Whether you're storing personal documents or sensitive data,
						DarkDrive keeps it private, secure, and accessible only to you.
					</h2>
					<Link to='/user'>
						<button>Secure Your Files Now</button>
					</Link>
				</div>
				<img src={Mockup} className='hidden sm:block' />
			</span>
			<section className='grid lg:grid-cols-2 items-center justify-center gap-8 py-8'>
				<aside className='flex flex-col items-center justify-center p-8'>
					<div className='flex flex-col gap-8 rounded-3xl p-4 backdrop-blur-sm'>
						<h1 className='text-accent'>What is DarkDrive?</h1>
						<p className='text-sm md:text-base lg:text-lg'>
							DarkDrive is a decentralized file-sharing system that lets you upload and download
							files securely across a peer-to-peer network. With no central servers, it’s resilient,
							private, and nearly impossible to take down. Share and access files freely—without
							restrictions or censorship. <br />
							<br />
							DarkDrive is built for speed, security, and complete freedom. With end-to-end
							encryption and a distributed network, your files stay safe and accessible anytime. No
							limits, no gatekeepers—just pure, decentralized sharing
						</p>
					</div>
				</aside>
				<aside className='flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-8 items-center justify-center w-full'>
					<Card
						icon='fa-solid fa-upload'
						heading='Seamless Secure Upload'
						paragraph='Easily upload files through a secure, user-friendly interface with a focus on data integrity.'
					/>
					<Card
						icon='fa-solid fa-lock'
						heading='Redundant Encryption'
						paragraph='Files can be encrypted with a password, ensuring maximum security and smooth user experience.'
					/>
					<Card
						icon='fa-solid fa-database'
						heading='Secure Storage'
						paragraph='Encrypted files are safely stored, with content visible only to the user.'
					/>
					<Card
						icon='fa-solid fa-key'
						heading='Full Access Control'
						paragraph='Users decide a password per file, maintaining full control over their files.'
					/>
				</aside>
			</section>
		</>
	);
};

export default Home;
