// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Script, console} from "forge-std/Script.sol";
import {Wallet} from "../src/Wallet.sol";

contract DeployWallet is Script {
    Wallet public wallet;

    function setUp() public {}

    function run() external returns (Wallet) {
        vm.startBroadcast();

        wallet = new Wallet();

        vm.stopBroadcast();

        return wallet;
    }
}
