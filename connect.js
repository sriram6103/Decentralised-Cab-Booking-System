import { ethers } from 'ethers';

// Set up provider
const provider = new ethers.Web3Provider(window.ethereum);

// Request user's wallet connection
const connectWallet = async () => {
    try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return signer;
    } catch (err) {
        console.error("User denied account access");
    }
};

// Get the contract
const getContract = (contractAddress, abi) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
};

export { connectWallet, getContract };
