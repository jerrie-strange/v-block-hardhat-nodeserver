const { ethers } = require("hardhat");

async function main() {
  try {
    // Define candidate data
    const candidateNames = [
      "Bola Ahmed Tinubu",
      "Atiku Abubakar",
      "Peter Obi",
      "Rabiu Kwankwaso",
      "Yabagi Sani",
    ];
    const partyLogos = [
      "/apc-logo.jpg",
      "/images.png",
      "/labour-party-logo.png",
      "/nnpp-logo.jpg",
      "/aa-logo.jpg",
    ];
    const partyNames = ["APC", "PDP", "LP", "NNPP", "AA"];
    const photos = [
      "/bola-tinubu.jpeg",
      "/atiku-abubakar.jpeg",
      "/peter-obi.jpeg",
      "/rabiu-kwankwaso.jpg",
      "/yabagi-sani.jpg",
    ];
    const positions = [
      "Former Governor of Lagos State",
      "Former Vice President",
      "Former Governor of Anambra State",
      "Former Governor of Kano State",
      "Candidate from a smaller party",
    ];

    // Get the contract factory
    const Voting = await ethers.getContractFactory("Voting");

    // Deploy the contract and wait for it to be deployed
    const votingContract = await Voting.deploy(
      candidateNames,
      partyLogos,
      partyNames,
      photos,
      positions
    );

    // Wait for the contract to be fully deployed.
    await votingContract.waitForDeployment();

    // Log the deployed contract address
    console.log(
      "Voting contract deployed to:",
      await votingContract.getAddress()
    );

    process.exit(0); // Success
  } catch (error) {
    console.error(error);
    process.exit(1); // Error
  }
}

// Run the deploy script
main();
// const { ethers } = require("hardhat");

// async function main() {
//   try {
//     // Define candidate data
//     const candidateNames = [
//       "Bola Ahmed Tinubu",
//       "Atiku Abubakar",
//       "Peter Obi",
//       "Rabiu Kwankwaso",
//       "Yabagi Sani",
//     ];
//     const partyLogos = [
//       "apc-logo.jpg",
//       "images.png",
//       "labour-party-logo.png",
//       "nnpp-logo.jpg",
//       "aa-logo.jpg",
//     ];
//     const partyNames = ["APC", "PDP", "LP", "NNPP", "AA"];
//     const photos = [
//       "bola-tinubu.jpeg",
//       "atiku-abubakar.jpeg",
//       "peter-obi.jpeg",
//       "rabiu-kwankwaso.jpg",
//       "yabagi-sani.jpg",
//     ];
//     const positions = [
//       "Former Governor of Lagos State",
//       "Former Vice President",
//       "Former Governor of Anambra State",
//       "Former Governor of Kano State",
//       "Candidate from a smaller party",
//     ];

//     // Get the contract factory
//     const Voting = await ethers.getContractFactory("Voting");

//     // Deploy the contract and wait for it to be deployed
//     const votingContract = await Voting.deploy(
//       candidateNames,
//       partyLogos,
//       partyNames,
//       photos,
//       positions
//     );

//     // Wait for the contract to be fully deployed.
//     await votingContract.deployed();

//     // Log the deployed contract address
//     console.log("Voting contract deployed to:", votingContract.address);

//     process.exit(0); // Success
//   } catch (error) {
//     console.error(error);
//     process.exit(1); // Error
//   }
// }

// // Run the deploy script
// main();
