// MetaMask Wallet Connection
const connectWalletButton = document.getElementById("connect-wallet");
const walletAddressDisplay = document.getElementById("wallet-address");
const walletBalanceDisplay = document.getElementById("wallet-balance");

let userAccount;

connectWalletButton.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            walletAddressDisplay.textContent = userAccount;

            const web3 = new Web3(window.ethereum);
            const balance = await web3.eth.getBalance(userAccount);
            walletBalanceDisplay.textContent = `${web3.utils.fromWei(balance, "ether")} ETH`;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Error connecting to MetaMask. Please try again.");
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to connect.");
    }
});

// Menu Toggle Logic
const menuButton = document.querySelector(".menu-button");
const menuWindow = document.getElementById("menuWindow");

menuButton.addEventListener("click", () => {
    menuWindow.classList.toggle("active");
});
