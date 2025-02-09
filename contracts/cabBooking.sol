// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CabBooking {
    // Define an enum for vehicle types
    enum VehicleType { Auto, Bike, Car }

    struct User {
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
        string password; // Store password (in real applications, use hashing)
        address userAddress;
        address walletAddress; // New field for wallet address
        bool isRegistered;
    }

    struct Driver {
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
        string password; // Store password (in real applications, use hashing)
        string licenseNumber;
        string vehicleRegistrationNumber;
        address driverAddress;
        address walletAddress; // New field for wallet address
        bool isAvailable; // Track if the driver is available for rides
        bool isRegistered;
    }

    struct RideRequest {
        address userAddress;
        string pickupLocation;
        string dropLocation;
        uint distanceInKm;
        string vehicleType; // Use string for vehicle type
        bool isCompleted; // Track if the ride has been completed
        address assignedDriver; // Driver who accepted the ride
    }

    mapping(address => User) public users;
    mapping(address => Driver) public drivers;
    address[] public driverAddresses; // Array to store driver addresses
    RideRequest[] public rideRequests; // Array to store ride requests

    event UserRegistered(address indexed user, string firstName, string lastName, string email);
    event DriverRegistered(address indexed driver, string name);
    event LoginSuccess(address indexed user);
    event LoginFailure(address indexed user);
    event RideRequested(address indexed user, string pickupLocation, string dropLocation, uint distanceInKm, string vehicleType);
    event RideAssigned(address indexed driver, uint requestId);
    event RideCompleted(uint requestId);
    
    // New event for notifying drivers about a ride request
    event RideRequestNotification(uint requestId, address indexed userAddress, string pickupLocation, string dropLocation, uint distanceInKm, string vehicleType);

    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User is not registered.");
        _;
    }

    modifier onlyRegisteredDriver() {
        require(drivers[msg.sender].isRegistered, "Driver is not registered.");
        _;
    }

    // Function to connect a wallet to the user's account
    function connectWallet(string memory _email, string memory _password, address _walletAddress) external onlyRegisteredUser {
        User storage user = users[msg.sender];
        
        require(keccak256(abi.encodePacked(user.email)) == keccak256(abi.encodePacked(_email)), "Email does not match.");
        require(keccak256(abi.encodePacked(user.password)) == keccak256(abi.encodePacked(_password)), "Password is incorrect.");
        
        user.walletAddress = _walletAddress;  // Store the wallet address

        emit LoginSuccess(msg.sender);  // Emit success after connecting wallet
    }

    // Register a new user
    function registerUser(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _password
    ) external {
        require(!users[msg.sender].isRegistered, "User already registered.");

        // Initialize the user
        users[msg.sender] = User({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            phoneNumber: _phoneNumber,
            password: _password,
            userAddress: msg.sender,
            walletAddress: address(0),  // Initialize with zero address
            isRegistered: true
        });

        emit UserRegistered(msg.sender, _firstName, _lastName, _email);
    }

    // Register a new driver with additional details
    function registerDriver(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _password,
        string memory _licenseNumber,
        string memory _vehicleRegistrationNumber
    ) external {
        require(!drivers[msg.sender].isRegistered, "Driver already registered.");

        // Initialize the driver
        drivers[msg.sender] = Driver({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            phoneNumber: _phoneNumber,
            password: _password,
            licenseNumber: _licenseNumber,
            vehicleRegistrationNumber: _vehicleRegistrationNumber,
            driverAddress: msg.sender,
            walletAddress: address(0),  // Initialize with zero address
            isAvailable: true,
            isRegistered: true
        });

        driverAddresses.push(msg.sender); // Add driver's address to the array

        emit DriverRegistered(msg.sender, _firstName);
    }

   // Login function to verify email and password
   function login(string memory _email, string memory _password, string memory role) external {
       if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("user"))) {
           User storage user = users[msg.sender];
           require(user.isRegistered, "User is not registered.");
           require(keccak256(abi.encodePacked(user.email)) == keccak256(abi.encodePacked(_email)), "Email does not match.");
           require(keccak256(abi.encodePacked(user.password)) == keccak256(abi.encodePacked(_password)), "Password is incorrect.");
           
           emit LoginSuccess(msg.sender);
           
       } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("driver"))) {
           Driver storage driver = drivers[msg.sender];
           require(driver.isRegistered, "Driver is not registered.");
           
           require(keccak256(abi.encodePacked(driver.email)) == keccak256(abi.encodePacked(_email)), "Email does not match.");
           require(keccak256(abi.encodePacked(driver.password)) == keccak256(abi.encodePacked(_password)), "Password is incorrect."); 
           
           emit LoginSuccess(msg.sender);
           
       } else {
           emit LoginFailure(msg.sender);
           revert("Invalid role specified.");
       }
   }

   // Function for users to request a ride with vehicle type as a string and pay for it
   function requestRide(
       string memory _pickupLocation,
       string memory _dropLocation,
       uint _distanceInKm,
       string memory vehicleType  // Use a string for vehicle type
   ) external payable onlyRegisteredUser {
       
      uint fareAmount = calculateFare(_distanceInKm, vehicleType);  // Calculate fare based on distance and vehicle type

      require(msg.value >= fareAmount * 1 ether / 1000, "Insufficient funds sent.");  // Check if enough Ether was sent (assuming fare is in dollars)

      RideRequest memory newRequest = RideRequest({
          userAddress: msg.sender,
          pickupLocation: _pickupLocation,
          dropLocation: _dropLocation,
          distanceInKm: _distanceInKm,
          vehicleType: vehicleType,  // Set the vehicle type using a string
          isCompleted: false,
          assignedDriver: address(0) // No driver assigned initially
      });

      rideRequests.push(newRequest); // Add the new ride request to the array

      emit RideRequested(msg.sender, _pickupLocation, _dropLocation, _distanceInKm, vehicleType);

      // Notify all available drivers about the new ride request
      notifyDrivers(newRequest);
   }

   // Function to notify all available drivers about the ride request
   function notifyDrivers(RideRequest memory newRequest) internal {
       uint requestId = rideRequests.length - 1; // Get the ID of the newly created request

       for (uint i = 0; i < driverAddresses.length; i++) { 
           if (drivers[driverAddresses[i]].isAvailable) { 
               emit RideRequestNotification(requestId, newRequest.userAddress, newRequest.pickupLocation, newRequest.dropLocation, newRequest.distanceInKm, newRequest.vehicleType);
           }
       }
   }

   // Function for drivers to accept a ride request
   function acceptRide(uint requestId) external onlyRegisteredDriver {
       require(requestId < rideRequests.length, "Invalid request ID.");
       RideRequest storage request = rideRequests[requestId];

       require(request.assignedDriver == address(0), "Ride already assigned.");

       // Assign the driver to the ride
       request.assignedDriver = msg.sender;

       emit RideAssigned(msg.sender, requestId);
   }

   // Function for drivers to complete a ride
   function completeRide(uint requestId) external onlyRegisteredDriver {
       require(requestId < rideRequests.length, "Invalid request ID.");
       RideRequest storage request = rideRequests[requestId];

       require(request.assignedDriver == msg.sender, "You are not assigned to this ride.");
       require(!request.isCompleted, "Ride already completed.");

       request.isCompleted = true; // Mark the ride as completed

       emit RideCompleted(requestId);
   }

   // Function to calculate fare based on distance and vehicle type as a string
   function calculateFare(uint distanceInKm, string memory vehicleType) public pure returns (uint) {
       uint fare;
        uint256 farePerKm;
       uint256 scalingFactor = 10000; // Use 4 decimals of precision

       if (keccak256(abi.encodePacked(vehicleType)) == keccak256(abi.encodePacked("auto"))) {
           fare = distanceInKm * 1;  // $10 per km for Auto
           farePerKm=10;
       } else if (keccak256(abi.encodePacked(vehicleType)) == keccak256(abi.encodePacked("bike"))) {
           fare = distanceInKm * 5;   // $5 per km for Bike
           farePerKm=10;
       } else if (keccak256(abi.encodePacked(vehicleType)) == keccak256(abi.encodePacked("car"))) {
           fare = distanceInKm * 15;  // $15 per km for Car
           farePerKm=10;
       } else {
           revert("Invalid vehicle type. Please use 'auto', 'bike', or 'car'.");
       }
        uint256 totalFareScaled = distanceInKm * farePerKm;

    // Convert back to the proper value by dividing by the scaling factor
    uint256 totalFare = totalFareScaled / scalingFactor;

       return totalFare;  // Return calculated fare amount in dollars.
   }

   // Example functionality for drivers to see upcoming rides (to be implemented)
   function upcomingRides() external view onlyRegisteredDriver returns (RideRequest[] memory) {
       uint count = 0;

       for (uint i = 0; i < rideRequests.length; i++) {
           if (!rideRequests[i].isCompleted && rideRequests[i].assignedDriver == address(0)) {
               count++;
           }
       }

       RideRequest[] memory availableRides = new RideRequest[](count);
       uint index = 0;

       for (uint i = 0; i < rideRequests.length; i++) {
           if (!rideRequests[i].isCompleted && rideRequests[i].assignedDriver == address(0)) {
               availableRides[index] = rideRequests[i];
               index++;
           }
       }

       return availableRides; // Return available rides for drivers
   }
    
   // Example functionality for notifications (to be implemented)
   function notifications() external onlyRegisteredDriver {
       // Logic for showing notifications goes here
   }
}
