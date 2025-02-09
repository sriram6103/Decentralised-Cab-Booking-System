// Smart Contract Details
const contractAddress = "0x96eddB8443268095867b4660cC4E3119D8E607e4"; // Replace with your deployed contract address
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "driver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "DriverRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "LoginFailure",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "LoginSuccess",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "driver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "RideAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "RideCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "pickupLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dropLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "distanceInKm",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vehicleType",
        "type": "string"
      }
    ],
    "name": "RideRequestNotification",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "pickupLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dropLocation",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "distanceInKm",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "vehicleType",
        "type": "string"
      }
    ],
    "name": "RideRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "email",
        "type": "string"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "acceptRide",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "distanceInKm",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "vehicleType",
        "type": "string"
      }
    ],
    "name": "calculateFare",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "completeRide",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_walletAddress",
        "type": "address"
      }
    ],
    "name": "connectWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "driverAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "drivers",
    "outputs": [
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "licenseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "vehicleRegistrationNumber",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "driverAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isAvailable",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "notifications",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_licenseNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_vehicleRegistrationNumber",
        "type": "string"
      }
    ],
    "name": "registerDriver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_pickupLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dropLocation",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_distanceInKm",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "vehicleType",
        "type": "string"
      }
    ],
    "name": "requestRide",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rideRequests",
    "outputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "pickupLocation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dropLocation",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "distanceInKm",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "vehicleType",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "assignedDriver",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "upcomingRides",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "pickupLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dropLocation",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "distanceInKm",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "vehicleType",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isCompleted",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "assignedDriver",
            "type": "address"
          }
        ],
        "internalType": "struct CabBooking.RideRequest[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "password",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "walletAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialize Ethers.js
let provider, signer, cabBookingContract;

async function initializeEthers() {
    // Initialize Ethers.js and connect to MetaMask (this part can be left out if not needed)
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask to use this application.");
        throw new Error("MetaMask not installed");
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access

    signer = provider.getSigner(); // Get the signer (connected account)
    cabBookingContract = new ethers.Contract(contractAddress, abi, signer); // Create a contract instance
}

// Function to register a user
async function registerUser(firstName, lastName, email, mobileNumber, password) {
    try {
        await initializeEthers(); // Initialize Ethers.js and connect to MetaMask

        const tx = await cabBookingContract.registerUser(firstName, lastName, email, mobileNumber, password);
        console.log(`Transaction sent: ${tx.hash}`); // Log transaction hash

        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Registration successful:", receipt);

        alert(`User registered successfully! Transaction hash: ${tx.hash}`);
        
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please check your input and try again.");
    }
}

// Function to register a driver
async function registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegistrationNumber) {
    try {
        await initializeEthers(); // Initialize Ethers.js and connect to MetaMask

        const tx = await cabBookingContract.registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegistrationNumber);
        console.log(`Transaction sent: ${tx.hash}`); // Log transaction hash

        const receipt = await tx.wait(); // Wait for transaction confirmation
        console.log("Driver registration successful:", receipt);

        alert(`Driver registered successfully! Transaction hash: ${tx.hash}`);
        
    } catch (error) {
        console.error("Error during driver registration:", error);
        alert("Driver registration failed. Please check your input and try again.");
    }
}

// Handle signup form submission
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.onsubmit = async function(event) {
        event.preventDefault(); // Prevent default form submission

        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const mobileNumber = document.getElementById('mobile_number').value;
        const password = document.getElementById('password').value;

        const role = document.getElementById('role').value; // Get selected role
        
        if (role === 'user') {
            await registerUser(firstName, lastName, email, mobileNumber, password); // Call user registration function
        } else if (role === 'driver') {
            const licenseNumber = document.getElementById('license').value; // Get license number
            const vehicleRegistrationNumber = document.getElementById('vehicle-reg').value; // Get vehicle registration number
            
            await registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegistrationNumber); // Call driver registration function
        } else {
            alert("Please select a valid role.");
        }
    }; 
});
