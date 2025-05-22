// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Purchase {
        address buyer;
        uint256 productId;
        uint256 price;
    }

    event PurchaseRecorded(address indexed buyer, uint256 productId, uint256 price);

    function recordPurchase(uint256 productId, uint256 price) public {
        emit PurchaseRecorded(msg.sender, productId, price);
    }
}
