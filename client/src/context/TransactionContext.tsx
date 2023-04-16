import React, { useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";
import { Transactions } from "../utils/Transactions";

export const TransactionsContext = React.createContext({
	connectWallet: () => {},
	currentAccount: "",
	formState: {
		address: "",
		amount: "",
		keyword: "",
		message: "",
	},
	updateFormState: (key) => (e) => {},
	sendTransactions: () => {},
} as {
	connectWallet: () => void;
	currentAccount: string | null;
	formState: {
		address: string;
		amount: string;
		keyword: string;
		message: string;
	};
	updateFormState: (arg0: string) => (e: any) => void;
	sendTransactions: () => void;
});

const { ethereum } = window;

const getEthereumContract = async () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractAbi,
		signer
	) as unknown as Transactions;

	return transactionContract;
};

function TransactionProvider({ children }: { children: React.ReactNode }) {
	const [currentAccount, setCurrentAccount] = React.useState<string | null>(
		null
	);
	const [formState, setFormState] = React.useState({
		address: "",
		amount: "",
		keyword: "",
		message: "",
	});

	const updateFormState = (key: string) => (e: any) => {
		setFormState((prevState) => ({
			...prevState,
			[key]: e.target.value,
		}));
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) {
				alert("Please install MetaMask");
				return;
			}

			if (!ethereum.request) {
				alert("Please install MetaMask");
				return;
			}

			const accounts = await ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length > 0) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No authorized account found");
			}

			console.log(accounts);
		} catch (error) {
			console.error(error);
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum || !ethereum.request) {
				alert("Please install MetaMask");
				return;
			}

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);

			throw new Error("Error connecting wallet");
		}
	};

	const sendTransactions = async () => {
		if (!ethereum || !ethereum.request) {
			alert("Please install MetaMask");
			return;
		}
		const { address, amount, keyword, message } = formState;
		const transactionContract = await getEthereumContract();
		const parsedAmount = ethers.utils.parseEther(amount);

		await ethereum.request({
			method: "eth_sendTransaction",
			params: [
				{
					from: currentAccount,
					to: address,
					gas: "0x5208",
					value: parsedAmount._hex,
				},
			],
		});

		const transactionHash = await transactionContract.addToBlockchain(
			address,
			parsedAmount,
			message,
			keyword
		);

		console.log(`Loading - ${transactionHash.hash}`);
		await transactionHash.wait();
		console.log(`Success - ${transactionHash.hash}`);

		const transactionCount = await transactionContract.getTransactionCount();

		console.log(transactionCount);
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<TransactionsContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formState,
				updateFormState,
				sendTransactions,
			}}>
			{children}
		</TransactionsContext.Provider>
	);
}

export default TransactionProvider;
