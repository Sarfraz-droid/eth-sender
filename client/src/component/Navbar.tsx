import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import Logo from "../assets/images/logo.png";

const NavbarItem = ({
	title,
	className,
}: {
	title: string;
	className?: string;
}) => {
	return (
		<li className={`max-4 cursor-pointer ${className && className}`}>
			{title}
		</li>
	);
};

function Navbar() {
	return (
		<nav className="w-full flex md:justify-center items-center p-4">
			<div className="md:flex-[0.5] flex-initial justify-center items-center">
				<img src={Logo} alt="logo" className="w-32" />
			</div>
			<ul className="text-white md:flex  list-none flex-row justify-between items-center flex-initial gap-5">
				{["Market", "Exchange", "Tutorials", "Wallets"].map((item, key) => (
					<NavbarItem key={key} title={item} />
				))}

				<li className="bg-white text-black rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200">
					Login
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
