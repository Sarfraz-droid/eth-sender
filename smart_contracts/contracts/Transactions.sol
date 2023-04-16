pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from , address reciever, uint amount, string message, string keyword);

    struct TransferStruct {
        address from;
        address reciever;
        uint amount;
        string message;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct({
                from: msg.sender,
                reciever: reciever,
                amount: amount,
                message: message,
                keyword: keyword
            })
        );

        emit Transfer(msg.sender, reciever, amount, message, keyword);
    }

    function getAllTransaction() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}