// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    uint256 public storedData;

    function store(uint256 num) public {
        storedData = num;
    }

    function retrieve() public view returns (uint256) {
        return storedData;
    }
}