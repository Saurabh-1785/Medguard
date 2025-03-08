const hre = require("hardhat");

async function main() {
  const MedGuard = await hre.ethers.getContractFactory("MedGuard");
  const medGuard = await MedGuard.deploy();

  await medGuard.deployed();

  console.log("MedGuard deployed to:", medGuard.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});