// Hardhat Runtime Environment, API yang disediakan oleh Hardhat
const hre = require("hardhat");

// menjalankan fungsi asynchronous (misalnya deploy, waitForDeployment).

async function main() {
  const PetCertificate = await hre.ethers.getContractFactory("PetCertificate");
  //ngedeploy
  const petCertificate = await PetCertificate.deploy();
  //supaya address ga error ini menunggu sampai benar" terdeploy atau tersedia di jaringan
  await petCertificate.waitForDeployment();
  console.log("PetCertificate deployed to:", await petCertificate.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// react front end nya, ethers yang menghubungkan membaca menyimpan memanggil fungsi dari smart contract