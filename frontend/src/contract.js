import { ethers } from "ethers";
import { contractABI, contractAddress } from './config';

// Initialize provider and signer
async function connectWallet() {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return signer;
    } else {
        console.log("Please install MetaMask!");
        return null;
    }
}

// Interact with contract
async function getContract() {
    const signer = await connectWallet();
    if (!signer) return;
    
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
}

// Example function to book a ride
async function bookRide(userId, destination) {
    const contract = await getContract();
    if (!contract) return;
    
    const tx = await contract.bookRide(userId, destination);
    console.log("Ride booked! Transaction:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed!");
}

export { bookRide };
