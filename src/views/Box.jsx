import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import uniqueId from "../components/URNG";
import ConnectWallet from "../components/WalletConnect";

import erc20Abi from "../utils/erc20.json";
import erc721Abi from "../utils/erc721.json";

const NftBox = () => {
  const [allowanceStatus, setAllowanceStatus] = useState(false);
  const [currentAccount, connectWallet] = ConnectWallet();

  const generator = uniqueId();

  const getAllowance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const NFTAddress = "0x96f23134549e14A8c66a7a596a94E7fBC89ee188";
      const BUSDAddress = "0xBf915DBEEe201f31dc0711a9bE702Db8BA94d2fa";
      const contract = new ethers.Contract(BUSDAddress, erc20Abi, provider);
      const getAllowance = await contract.allowance(
        signer.getAddress(),
        NFTAddress
      );
      const allowance = BigNumber.from(getAllowance).toString();
      console.log(allowance);
      if (getAllowance > 0) {
        setAllowanceStatus(true);
      } else {
        setAllowanceStatus(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const approve = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const BUSDAddress = "0xBf915DBEEe201f31dc0711a9bE702Db8BA94d2fa";
      const contract = new ethers.Contract(BUSDAddress, erc20Abi, signer);
      const NFtAddress = "0x96f23134549e14A8c66a7a596a94E7fBC89ee188";
      const approve = await contract.approve(
        NFtAddress,
        ethers.constants.MaxUint256
      );
      await approve.wait();
      getAllowance();
    } catch (error) {
      console.log(error.message);
      alert(error.reason);
    }
  };

  const MintNft = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const NFTAddress = "0x96f23134549e14A8c66a7a596a94E7fBC89ee188";
      const contract = new ethers.Contract(NFTAddress, erc721Abi, signer);
      const mint = await contract.safeMintWithBUSD(tokenId);
      await mint.wait();
      console.log(mint);
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  useEffect(() => {
    getAllowance();
  });

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col text-white bg-darkBlue min-w-120 p-7 rounded-2xl drop-shadow-2xl shadow-2xl md:ml-60 w-80 ml-8">
        <h2 className="self-center text-4xl font-bold">NFT MINTER</h2>
        <div className="flex flex-col self-center bg-darkBlue p-2 border-2 border-white rounded-full w-64 ml-2 drop-shadow-2xl shadow-2xl mt-40 hover:bg-white hover:text-black hover:border-transparent">
          {!currentAccount ? (
            <button onClick={connectWallet}>connectWallet</button>
          ) : !allowanceStatus ? (
            <button onClick={approve}>Approve Busd</button>
          ) : (
            <button
              onClick={() => {
                const tokenId = Math.floor(generator());
                MintNft(tokenId);
              }}
            >
              Mint Nft
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftBox;
