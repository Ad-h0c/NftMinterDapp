import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import ConnectWallet from "../components/WalletConnect";

import erc20Abi from "../utils/erc20.json";
import erc721Abi from "../utils/erc721.json";

const NftBox = () => {
  const [allowanceStatus, setAllowanceStatus] = useState(false);
  const [currentAccount, connectWallet] = ConnectWallet();

  const getAllowance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const NFTAddress = "0x6E78878Bd02AB91FE15A582C9D5d39D6DE20Bf5b";
      const erc20Address = "0xfbc577316dD351F48749Ee1EF103AC4bb82A4997";
      const contract = new ethers.Contract(erc20Address, erc20Abi, provider);
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
      const erc20Address = "0xfbc577316dD351F48749Ee1EF103AC4bb82A4997";
      const contract = new ethers.Contract(erc20Address, erc20Abi, signer);
      const NFtAddress = "0x6E78878Bd02AB91FE15A582C9D5d39D6DE20Bf5b";
      const approve = await contract.approve(
        NFtAddress,
        ethers.constants.MaxUint256
      );
      await approve.wait();
      getAllowance();
    } catch (error) {
      console.log(error.message);
    }
  };

  const MintNft = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const NFTAddress = "0x6E78878Bd02AB91FE15A582C9D5d39D6DE20Bf5b";
      const contract = new ethers.Contract(NFTAddress, erc721Abi, signer);
      const mint = await contract.safeMintWithBUSD(tokenId);
      mint.then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllowance();
  });

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col text-white bg-darkBlue min-w-120 p-7 rounded-2xl drop-shadow-2xl shadow-2xl md:ml-60 w-80 ml-8">
        <h2 className="self-center text-4xl font-bold">NFT Minter</h2>
        <div className="flex flex-col bg-darkBlue p-2 border-2 border-white rounded-full w-64 ml-2 drop-shadow-2xl shadow-2xl mt-28 hover:bg-white hover:text-black hover:border-transparent">
          {!currentAccount ? (
            <button onClick={connectWallet}>connectWallet</button>
          ) : !allowanceStatus ? (
            <button onClick={approve}>Approve Busd</button>
          ) : (
            <button
              onClick={() => {
                const tokenId = Math.floor(Math.random() * 100000000000000);
                MintNft(tokenId);
              }}
            >
              Mint NFT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftBox;
