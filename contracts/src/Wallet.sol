// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Wallet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function deposit() public payable {}

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only owner is allowed");
        require(address(this).balance >= amount, "Insufficient funds");
        (bool sent,) = payable(owner).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
