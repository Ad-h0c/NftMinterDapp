import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import ConnectWallet from "../components/WalletConnect";

import erc20Abi from "../utils/erc20.json";

const NftBox = () => {
  const [allowanceStatus, setAllowanceStatus] = useState(false);
  const [currentAccount, connectWallet] = ConnectWallet();

  const getAllowance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const NFTAddress = "0xE08a77e3b8812B144B47EA9f1c59b2eC29AB3312";
      const erc20Address = "0xfbc577316dD351F48749Ee1EF103AC4bb82A4997";
      const contract = new ethers.Contract(erc20Address, erc20Abi, provider);
      const getAllowance = await contract.allowance(
        signer.getAddress(),
        NFTAddress
      );

      const allowance = BigNumber.from(getAllowance).toString();
      console.log(allowance);
      if (getAllowance > 10 * 10 ** 18) {
        setAllowanceStatus(true);
      } else {
        setAllowanceStatus(false);
      }
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
            <button onClick={getAllowance}>Approve Busd</button>
          ) : (
            <button>Mint NFT</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftBox;
