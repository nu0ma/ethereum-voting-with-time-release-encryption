pragma solidity >0.4.0 <0.6.0;

contract Owned {
    address public ownerAddress;

    constructor() public {
        ownerAddress = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == ownerAddress, "You are not owner !!");
        _;
    }
}
