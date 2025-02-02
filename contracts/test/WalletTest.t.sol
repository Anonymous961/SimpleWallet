// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {Wallet} from "../src/Wallet.sol";
import {DeployWallet} from "../script/DeployWallet.s.sol";

contract WalletTest is Test {
    Wallet wallet;

    address USER = makeAddr("user");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address charlie = makeAddr("charlie");

    function setUp() external {
        DeployWallet deployWallet = new DeployWallet();
        wallet = deployWallet.run();
    }

    function testDeposit() public {
        // Fund the test contract with 1 ether
        vm.deal(alice, 1 ether);
        vm.prank(alice);
        wallet.deposit{value: 1 ether}();

        // Check the balance of the wallet
        vm.prank(alice);
        uint256 balance = wallet.getBalance();
        assertEq(balance, 1 ether);
    }

    function testTransfer() public{
        vm.deal(alice,1 ether);
        vm.prank(alice);
        wallet.deposit{value:1 ether}();

        vm.prank(alice);
        wallet.transfer(charlie,0.4 ether);

        assertEq(wallet.balances(alice),0.6 ether);
        assertEq(wallet.balances(charlie),0.4 ether);
    }

    function testWithdraw() public {
        // Bob deposits 2 ether
        vm.deal(bob, 2 ether);
        vm.prank(bob);
        wallet.deposit{value: 2 ether}();

        // Bob withdraws 1 ether
        vm.prank(bob);
        wallet.withdraw(1 ether);

        // Check balances
        assertEq(wallet.balances(bob), 1 ether);
        assertEq(bob.balance, 1 ether);
    }
}
