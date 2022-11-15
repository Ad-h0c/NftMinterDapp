// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./lib/Transferhelper.sol";

contract erc721 is ERC721("HyperNfts", "hyper"), Ownable {
    uint decimalPoint = 10**18;

    uint private tokenPrice = 1 * decimalPoint;

    IERC20 public tokenAddress;

    constructor(address add_) {
        tokenAddress = IERC20(add_);
    }

    function Balance(address add_) public view returns (uint) {
        return tokenAddress.balanceOf(add_);
    }

    function nftPrice() public view returns (uint) {
        return tokenPrice;
    }

    function setNftPrice(uint _price) public onlyOwner {
        tokenPrice = _price * decimalPoint;
    }

    function safeMintWithBUSD(uint tokenId_) public {
        require(Balance(_msgSender()) >= tokenPrice, "Insufficient balance");
        require(
            balanceOf(msg.sender) < 10,
            "User already holds maximum number of nfts."
        );

        TransferHelper.safeTransferFrom(
            address(tokenAddress),
            _msgSender(),
            address(this),
            tokenPrice
        );
        _safeMint(_msgSender(), tokenId_);
    }

    function withdrawAllBusd() public onlyOwner {
        uint totalBalance = Balance(address(this));
        tokenAddress.transfer(_msgSender(), totalBalance);
    }

    function withdrawAllBusdToCustomAddress(address _to) public onlyOwner {
        uint totalBalance = Balance(address(this));
        tokenAddress.transfer(_to, totalBalance);
    }

    function customBusdWithdraw(uint amount_) public onlyOwner {
        uint totalBalance = Balance(address(this));
        require(amount_ <= totalBalance, "ERROR: Insufficient balance");
        tokenAddress.transfer(_msgSender(), amount_);
    }

    function customBusdWithdrawToCustomAddress(uint amount_, address _to)
        public
        onlyOwner
    {
        uint totalBalance = Balance(address(this));
        require(amount_ <= totalBalance, "ERROR: Insufficient balance");
        tokenAddress.transfer(_to, amount_);
    }
}
