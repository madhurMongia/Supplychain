const supplyChain = artifacts.require('supplyChain');

module.exports = (deployer) => {
    deployer.deploy(supplyChain);
};