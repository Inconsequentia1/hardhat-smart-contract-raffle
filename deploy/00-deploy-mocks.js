const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 is the premium (LINK)
const GAS_PRICE_LINK = 1e9; // Calculated value based on gas price of the chain
// GAS_PRICE_LINK can be set to any value we want here because we are deploying to a local chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
        });
        log("Mocks Deployed!");
        log("--------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
