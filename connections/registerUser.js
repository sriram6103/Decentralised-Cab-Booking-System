// registerUser.js

// Importing required libraries
const Web3 = require('web3');
const contractABI = require('./CabBooking.json').abi;  // ABI of the contract
const contractAddress = "0xb656EeF0215E94eE8E90e39f418b52841eac54b0";  // Replace with your deployed contract address

// Initialize web3 instance
const web3 = new Web3(window.ethereum);

// Connect to the user's MetaMask wallet
async function connectWallet() {
  try {
    // Request accounts from the user's MetaMask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Wallet connected!');
  } catch (error) {
    console.error('Failed to connect wallet:', error);
  }
}

// Register User function
async function registerUser(userName) {
  try {
    // Get the user's address
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];  // Assuming the first account in MetaMask is the user

    // Create a contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Call the registerUser function of the smart contract
    const tx = await contract.methods.registerUser(userName).send({ from: userAddress });
    console.log('User registered:', tx);

    // Listen for the UserRegistered event
    contract.events.UserRegistered({ filter: { user: userAddress } })
      .on('data', event => {
        console.log('User Registered Event:', event);
        alert(`User registered successfully with name: ${userName}`);
      })
      .on('error', err => {
        console.error('Error in event:', err);
        alert('An error occurred while registering the user.');
      });
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred while registering the user.');
  }
}

// Example usage of the connectWallet and registerUser functions
window.onload = async () => {
  await connectWallet();

  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', async () => {
    const userName = document.getElementById('userName').value;  // Get user name from input
    if (userName) {
      await registerUser(userName);  // Register the user with the provided name
    } else {
      alert('Please enter a valid name.');
    }
  });
};
