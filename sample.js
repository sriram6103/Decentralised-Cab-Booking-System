const { ethers } = require('ethers');

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/P3lTSoQpPQyHVLjbMXafVq5fFGUntGsS");

    // Get block by number
    const blockNumber = "latest";
    const block = await provider.getBlock(blockNumber);

    console.log(block);
}

main().catch(console.error);
