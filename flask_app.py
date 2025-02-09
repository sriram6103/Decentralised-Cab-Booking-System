import json
from web3 import Web3

# Load the contract ABI from the JSON file
with open(r"C:\Projects\Cabzii\Decentralised-cab-booking-system\artifacts\contracts\cabBooking.sol\CabBooking.json", "r") as f:
    contract_data = json.load(f)
    CONTRACT_ABI = contract_data.get("abi")  # Extract the ABI
    if not isinstance(CONTRACT_ABI, list):
        raise ValueError("ABI must be a list. Check your JSON file.")

# Connect to Web3 provider
web3 = Web3(Web3.HTTPProvider("https://polygon-amoy.g.alchemy.com/v2/P3lTSoQpPQyHVLjbMXafVq5fFGUntGsS"))  # Replace with your Infura/Alchemy URL
if web3.is_connected():
    print("Connected to Polygon Testnet")
else:
    print("Failed to connect to Polygon Testnet")
    exit()

# Define the deployed contract address
CONTRACT_ADDRESS = "0xe6353aa5c51f9642509c793c3e582b2195844218"  # Replace with your deployed contract address

# Initialize the contract


CHECKSUM_ADDRESS = Web3.to_checksum_address(CONTRACT_ADDRESS)

# Initialize the contract
contract = web3.eth.contract(address=CHECKSUM_ADDRESS, abi=CONTRACT_ABI)

# Test the contract connection
print(f"Contract initialized: {contract.address}")
