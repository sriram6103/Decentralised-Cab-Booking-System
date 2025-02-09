export const contractABI = [
    
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
    
    // Add other contract functions as needed
];

export const contractAddress = "0xeF50110EAc01512796e7AaFEe68458800A4bD358";  // Replace with actual deployed contract address
