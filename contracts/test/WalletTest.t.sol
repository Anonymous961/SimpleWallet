// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {Wallet} from "../src/Wallet.sol";
import {DeployWallet} from "../script/DeployWallet.s.sol";

contract WalletTest is Test {
    Wallet wallet;

    address USER = makeAddr("user");

    function setUp() external {
        DeployWallet deployWallet = new DeployWallet();
        wallet = deployWallet.run();
    }

    function testWithdraw() public {
        vm.deal(address(wallet), 1 ether);

        vm.prank(msg.sender);
        wallet.withdraw(0.5 ether);

        assertEq(address(wallet).balance, 0.5 ether);
    }

    function testWithdrawNonOwner() public {
        vm.prank(USER);
        vm.expectRevert("Only owner is allowed");
        wallet.withdraw(0.5 ether);
    }

    function testWithdrawFailInsufficientFunds() public {
        vm.prank(msg.sender);
        vm.expectRevert("Insufficient funds");
        wallet.withdraw(1 ether);
    }

    function testGetBalance() public {
        vm.deal(address(wallet), 5 ether);
        uint256 balance = wallet.getBalance();
        console.log(balance);
        assertEq(balance, 5 ether);
    }

    function testReceive() public {
        // Fund the test contract with 1 ether
        vm.deal(address(this), 1 ether);

        // Send Ether to the wallet contract (triggers receive())
        (bool success,) = address(wallet).call{value: 1 ether}("");
        require(success, "Failed to send Ether");

        // Check the balance of the wallet
        uint256 balance = wallet.getBalance();
        assertEq(balance, 1 ether);
    }

    function testDeposit() public {
        // Fund the test contract with 1 ether
        vm.deal(address(this), 1 ether);

        // Call the deposit function with 1 ether
        (bool success,) = address(wallet).call{value: 1 ether}(abi.encodeWithSignature("deposit()"));
        require(success, "Failed to deposit Ether");

        // Check the balance of the wallet
        uint256 balance = wallet.getBalance();
        assertEq(balance, 1 ether);
    }
}
