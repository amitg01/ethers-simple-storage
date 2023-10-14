// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 number;

    function store(uint256 num) public virtual {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}