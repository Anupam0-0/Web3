const crypto = require('crypto');

// Block class definition
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index; // Position of the block in the chain
    this.timestamp = timestamp; // Creation time
    this.data = data; // Block data (e.g., transactions)
    this.previousHash = previousHash; // Hash of the previous block
    this.nonce = 0; // Used for mining (not used here)
    this.hash = this.calculateHash(); // Hash of this block
  }

  // Calculate the hash for the block
  calculateHash() {
    const content = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(content).digest('hex');
  }
}

// Create blockchain as an array
let blockchain = [];

// Function to create the genesis (first) block
const createGenesisBlock = () => new Block(0, Date.now().toString(), "Genesis Block", "0");
blockchain.push(createGenesisBlock());

// Add two more blocks to the chain
for (let i = 1; i < 3; i++) {
  const prevBlock = blockchain[i - 1];
  const newBlock = new Block(i, Date.now().toString(), `Block ${i}`, prevBlock.hash);
  blockchain.push(newBlock);
}

// Display the original blockchain
console.log("Original Chain:");
blockchain.forEach(block => console.log(JSON.stringify(block, null, 2)));

/*
Sample Output:
Original Chain:
{
  "index": 0,
  "timestamp": "1719999999999",
  "data": "Genesis Block",
  "previousHash": "0",
  "nonce": 0,
  "hash": "a1b2c3d4..."
}
{
  "index": 1,
  "timestamp": "1719999999999",
  "data": "Block 1",
  "previousHash": "a1b2c3d4...",
  "nonce": 0,
  "hash": "b2c3d4e5..."
}
{
  "index": 2,
  "timestamp": "1719999999999",
  "data": "Block 2",
  "previousHash": "b2c3d4e5...",
  "nonce": 0,
  "hash": "c3d4e5f6..."
}
*/

// Tamper with Block 1's data and recalculate its hash
console.log("\nTampering Block 1...");
blockchain[1].data = "Hacked Data";
blockchain[1].hash = blockchain[1].calculateHash();

// Display the blockchain after tampering
console.log("After Tampering:");
blockchain.forEach(block => console.log(JSON.stringify(block, null, 2)));

/*
Sample Output:
Tampering Block 1...
After Tampering:
{
  "index": 0,
  "timestamp": "1719999999999",
  "data": "Genesis Block",
  "previousHash": "0",
  "nonce": 0,
  "hash": "a1b2c3d4..."
}
{
  "index": 1,
  "timestamp": "1719999999999",
  "data": "Hacked Data",
  "previousHash": "a1b2c3d4...",
  "nonce": 0,
  "hash": "e5f6g7h8..." // Hash changed due to tampering
}
{
  "index": 2,
  "timestamp": "1719999999999",
  "data": "Block 2",
  "previousHash": "b2c3d4e5...", // Still points to old hash, chain is now invalid
  "nonce": 0,
  "hash": "c3d4e5f6..."
}
*/
