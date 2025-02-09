// Ensure that web3.js is available
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    var web3 = new Web3(window.ethereum);
} else {
    alert("Please install MetaMask to use this application.");
}

// Polygon AMOY Testnet details
const POLYGON_AMOY_CHAIN_ID = '80002'; // Replace with the correct Chain ID if different
const POLYGON_AMOY_RPC_URL = 'https://rpc.amoy.polygon.network'; // Replace with the correct RPC URL
const POLYGON_AMOY_BLOCK_EXPLORER_URL = 'https://amoy.polygon.network/explorer'; // Replace with the correct Block Explorer URL

// Button and UI elements
const connectButton = document.getElementById('connectButton');
const userAccountDisplay = document.getElementById('userAccount');
const networkStatusDisplay = document.getElementById('networkStatus');
const walletAddressDisplay = document.getElementById("wallet-address");
const walletBalanceDisplay = document.getElementById("wallet-balance");
const profileButton = document.querySelector(".profile-button");
const profileWindow = document.getElementById("profileWindow");

// Function to connect MetaMask
async function connectMetaMask() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];
        userAccountDisplay.textContent = Connected account: ${userAccount};
        await checkNetwork();
        fetchWalletDetails(userAccount); // Fetch wallet details after connecting
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect MetaMask. Please try again.");
    }
}

// Function to check if the user is connected to Polygon AMOY Testnet
async function checkNetwork() {
    const networkId = await web3.eth.net.getId();
    if (networkId === parseInt(POLYGON_AMOY_CHAIN_ID, 16)) {
        networkStatusDisplay.textContent = 'Connected to Polygon AMOY Testnet';
    } else {
        networkStatusDisplay.textContent = 'Not connected to Polygon AMOY Testnet';
        alert("Please switch to the Polygon AMOY Testnet.");
        await switchToPolygonAMOY();
    }
}

// Function to switch MetaMask to Polygon AMOY Testnet
async function switchToPolygonAMOY() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: POLYGON_AMOY_CHAIN_ID }],
        });
        console.log("Switched to Polygon AMOY Testnet");
    } catch (error) {
        console.error("Failed to switch to Polygon AMOY Testnet:", error);
        if (error.code === 4902) { // Chain not added in MetaMask
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: POLYGON_AMOY_CHAIN_ID,
                        chainName: 'Polygon AMOY Testnet',
                        rpcUrls: [POLYGON_AMOY_RPC_URL],
                        nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                        blockExplorerUrls: [POLYGON_AMOY_BLOCK_EXPLORER_URL],
                    }],
                });
                console.log("Polygon AMOY Testnet added successfully");
            } catch (addError) {
                console.error("Failed to add Polygon AMOY Testnet:", addError);
            }
        }
    }
}

// Function to fetch wallet details (address and balance)
async function fetchWalletDetails(userAccount) {
    try {
        const balance = await web3.eth.getBalance(userAccount);
        walletAddressDisplay.textContent = Wallet Address: ${userAccount};
        walletBalanceDisplay.textContent = Balance: ${web3.utils.fromWei(balance, "ether")} MATIC;
    } catch (error) {
        console.error("Error fetching wallet details:", error);
    }
}

// Add event listener to the connect button
connectButton.addEventListener('click', connectMetaMask);

// Profile toggle logic
profileButton.addEventListener("click", () => {
    profileWindow.classList.toggle("active");
});
