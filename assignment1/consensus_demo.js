// Simulated Validators
// Randomly assign computing power to the miner and stake to the staker
const miner = { name: "Alice", power: Math.floor(Math.random() * 100) };
const staker = { name: "Bob", stake: Math.floor(Math.random() * 100) };

// List of voters and their votes for DPoS
const voters = [
  { voter: "user1", vote: "Charlie" },
  { voter: "user2", vote: "Charlie" },
  { voter: "user3", vote: "Dave" },
];

// Proof-of-Work (PoW) simulation
function simulatePoW(miner) {
  console.log("\nPoW:");
  console.log(`Miner Power: ${miner.name} = ${miner.power}`);
  // In PoW, the miner with the highest computing power is selected
  console.log(`Selected validator: ${miner.name} (Highest computing power)`);
  // Example output:
  // PoW:
  // Miner Power: Alice = 57
  // Selected validator: Alice (Highest computing power)
}

// Proof-of-Stake (PoS) simulation
function simulatePoS(staker) {
  console.log("\nPoS:");
  console.log(`Staker: ${staker.name}, Stake: ${staker.stake}`);
  // In PoS, the staker with the highest stake is selected
  console.log(`Selected validator: ${staker.name} (Highest stake wins)`);
  // Example output:
  // PoS:
  // Staker: Bob, Stake: 42
  // Selected validator: Bob (Highest stake wins)
}

// Delegated Proof-of-Stake (DPoS) simulation
function simulateDPoS(voters) {
  console.log("\nDPoS:");
  // Count votes for each delegate
  const voteCount = {};
  voters.forEach(v => voteCount[v.vote] = (voteCount[v.vote] || 0) + 1);
  // Find the delegate with the most votes
  const winner = Object.keys(voteCount).reduce((a, b) => voteCount[a] > voteCount[b] ? a : b);
  console.log("Votes:", voteCount);
  // The delegate with the majority vote is selected
  console.log(`Selected delegate: ${winner} (Chosen by majority vote)`);
  // Example output:
  // DPoS:
  // Votes: { Charlie: 2, Dave: 1 }
  // Selected delegate: Charlie (Chosen by majority vote)
}

// Run all consensus simulations
simulatePoW(miner);
simulatePoS(staker);
simulateDPoS(voters);
