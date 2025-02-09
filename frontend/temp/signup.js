// Ensure MetaMask is installed
if (typeof window.ethereum === 'undefined') {
    alert("MetaMask is not installed. Please install MetaMask to use this application.");
    throw new Error("MetaMask not installed");
}

// Initialize Web3
const web3 = new Web3(window.ethereum);

// Smart Contract Details
const contractAddress = '0x96eddB8443268095867b4660cC4E3119D8E607e4'; // Replace with your deployed contract address
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

// Create a contract instance
const cabBookingContract = new web3.eth.Contract(abi, contractAddress);

// Function to register a user
async function registerUser(firstName, lastName, email, mobileNumber, password) {
    try {
        const accounts = await web3.eth.requestAccounts(); // Request accounts from MetaMask
        const userAccount = accounts[0]; // Use the first account

        // Call the smart contract function
        await cabBookingContract.methods.registerUser(firstName, lastName, email, mobileNumber, password)
            .send({ from: userAccount });

        alert("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
        alert("Failed to register user. Check console for details.");
    }
}

// Function to register a rider
async function registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegNumber) {
    try {
        const accounts = await web3.eth.requestAccounts(); // Request accounts from MetaMask
        const userAccount = accounts[0]; // Use the first account

        // Call the smart contract function
        await cabBookingContract.methods.registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegNumber)
            .send({ from: userAccount });

        alert("Driver registered successfully!");
    } catch (error) {
        console.error("Error registering driver:", error);
        alert("Failed to register driver. Check console for details.");
    }
}

// Handle form submission
document.querySelector("form").onsubmit = async function(event) {
    event.preventDefault(); // Prevent default form submission

    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobile_number').value;
    const password = document.getElementById('password').value;
    const verifyPassword = document.getElementById('verify-password').value;
    const role = document.getElementById('role').value;

    // Validate passwords match
    if (password !== verifyPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    if (role === "user") {
        // Register as a user
        await registerUser(firstName, lastName, email, mobileNumber, password);
    } else if (role === "driver") {
        // Get rider-specific fields
        const licenseNumber = document.getElementById('license').value;
        const vehicleRegNumber = document.getElementById('vehicle-reg').value;

        if (!licenseNumber || !vehicleRegNumber) {
            alert("Please fill in all rider-specific fields.");
            return;
        }

        // Register as a rider
        await registerDriver(firstName, lastName, email, mobileNumber, password, licenseNumber, vehicleRegNumber);
    } else {
        alert("Please select a valid role.");
    }
};
