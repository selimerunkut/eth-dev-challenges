// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, artStewardAddress } = await getNamedAccounts();

  await deploy("ERC721", {
    from: deployer,
    log: true,
    waitConfirmations: 2,
  });

  const erc721 = await ethers.getContract("ERC721", deployer);
  console.log("ERC721 deployed to: ", erc721.address);
  console.log("artStewardAddress: ", artStewardAddress);

  await deploy("ArtSteward", {
    from: deployer,
    args: [artStewardAddress, erc721.address],
    log: true,
    waitConfirmations: 2,
  });
  const artSteward = await ethers.getContract("ArtSteward", deployer);

  console.log("ERC721 deployed to: ", erc721.address);
  console.log("ArtSteward deployed to: ", artSteward.address);
};
module.exports.tags = ["YourContract"];
