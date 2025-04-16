import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
	const MOBILE_WIDTH = 768;
	const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken"));

	const handleLogout = () => {
		localStorage.clear();
		setIsLoggedIn(false);
	};

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < MOBILE_WIDTH;
			setIsMobile(mobile);
			if (!mobile) {
				setMenuOpen(false); // Close the menu on larger screens
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleStorageChange = () => {
			setIsLoggedIn(localStorage.getItem("userToken"));
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const navLinks = [
		{ name: "Home", path: "/" },
		isLoggedIn && { name: "Dashboard", path: "/user" },
		!isLoggedIn && { name: "Login", path: "/login" },
		isLoggedIn && {
			name: "Logout",
			path: "/",
			onClick: handleLogout,
		},
	].filter(Boolean);

	return (
		<>
			<nav className='fixed w-full z-20'>
				<Link to='/'>
					<h1 className='font-display'>Dark Drive</h1>
				</Link>
				{isMobile ? (
					<button
						onClick={() => setMenuOpen((prev) => !prev)} // Trigger menu toggle
						className='focus:outline-none rounded-none py-8'
					>
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				) : (
					<ul>
						{navLinks.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								onClick={() => {
									if (link.onClick) link.onClick();
								}}
								title={link.name}
								className={`navLink ${
									(link.name === "Login" || link.name === "Logout") &&
									"rounded-b-sm h-4 bg-accent text-primary hover:bg-highlight"
								}`}
							>
								{link.name}
							</Link>
						))}
					</ul>
				)}
			</nav>

			{/* Menu rendering when mobile and open */}
			<AnimatePresence>
				{isMobile && menuOpen ? (
					<motion.ul
						initial={{ y: -200 }}
						animate={{ y: 0 }}
						exit={{ y: -200 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className='fixed top-22 left-0 w-full bg-primary z-10 shadow-lg'
					>
						{navLinks.map((link) => (
							<li key={link.name}>
								<Link
									to={link.path}
									className={`p-8 flex flex-col items-center justify-center text-xl ${
										(link.name === "Login" || link.name === "Logout") && "bg-accent text-primary"
									}`}
									onClick={() => {
										if (link.onClick) link.onClick();
										setMenuOpen(false);
									}} // Optionally close menu when a link is clicked
								>
									{link.name}
								</Link>
							</li>
						))}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
