// eslint-disable-next-line no-undef
const Voting = artifacts.require("Voting.sol");

module.exports = function (deployer) {
  deployer.deploy(Voting);
};