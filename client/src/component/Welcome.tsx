import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from "./";
import { TransactionsContext } from "../context/TransactionContext";

function Welcome() {
	const {
		connectWallet,
		currentAccount,
		updateFormState,
		formState,
		sendTransactions,
	} = useContext(TransactionsContext);

	console.log(currentAccount);

	const submitTransaction = async () => {
		const { address, amount, keyword, message } = formState;
		console.log(address, amount, keyword, message);
		if (!address || !amount || !keyword) {
			return;
		}

		sendTransactions();
	};

	return (
		<div className="w-full flex justify-center items-center">
			<div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
				<div className="flex flex-1 justify-start flex-col md:mr-10">
					<h1 className="text-3xl text-white sm:text-5xl text-gradient py-1">
						Send Crypto
						<br /> to anyone, anywhere
					</h1>
					<p className="text-left mt-5 text-white">
						Explore. Buy and sell crypto
					</p>
					{!currentAccount && (
						<button
							className="bg-white text-black rounded-md px-4 py-2 cursor-pointer hover:bg-slate-200 mt-5"
							onClick={connectWallet}
							type="button">
							Connect Wallet
						</button>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-3 flex-1 justify-start mx-20">
				<input
					className="input"
					type="text"
					placeholder="Enter Address"
					onChange={updateFormState("address")}
				/>
				<input
					className="input"
					type="text"
					placeholder="Enter Amount"
					onChange={updateFormState("amount")}
				/>
				<input
					className="input"
					type="text"
					placeholder="Enter Keyword (GIF)"
					onChange={updateFormState("keyword")}
				/>
				<input
					className="input"
					type="text"
					placeholder="Enter Message (Optional)"
					onChange={updateFormState("message")}
				/>
				<button className="btn btn-primary" onClick={submitTransaction}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Welcome;
