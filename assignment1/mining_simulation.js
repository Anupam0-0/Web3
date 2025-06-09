const crypto = require('crypto');

// Block class represents a single block in the blockchain
class Block {
  /**
   * @param {number} index - Position of the block in the chain
   * @param {any} data - Data to store in the block (e.g., transaction info)
   * @param {string} previousHash - Hash of the previous block in the chain
   */
  constructor(index, data, previousHash = '') {
    this.index = index; // Block number
    this.timestamp = Date.now(); // Creation time (milliseconds since epoch)
    this.data = data; // Block data
    this.previousHash = previousHash; // Previous block's hash
    this.nonce = 0; // Counter used for mining
    this.hash = this.calculateHash(); // Current block's hash
  }

  // Calculates the SHA-256 hash of the block's contents
  calculateHash() {
    const input = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(input).digest('hex');
  }

  /**
   * Mines the block by finding a hash with a certain number of leading zeros (difficulty)
   * @param {number} difficulty - Number of leading zeros required in the hash
   */
  mineBlock(difficulty) {
    const prefix = Array(difficulty + 1).join("0"); // e.g., '0000' for difficulty 4
    const start = Date.now();
    // Keep incrementing nonce until hash starts with required number of zeros
    while (this.hash.substring(0, difficulty) !== prefix) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    const end = Date.now();
    // Output mined block information
    console.log(`Block mined: ${this.hash}`);
    console.log(`Nonce: ${this.nonce}, Time taken: ${(end - start) / 1000}s`);
  }
}

// Example usage:
// Create a new block with index 1, data { amount: 100 }, and previous hash "0000abcdef"
const block = new Block(1, { amount: 100 }, "0000abcdef");
// Mine the block with difficulty 4 (hash must start with '0000')
block.mineBlock(4);

/*
Sample Output:
Block mined: 0000b1c2e3f4a5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0
Nonce: 52341, Time taken: 2.134s
(Note: Actual hash, nonce, and time will vary each run)
*/
