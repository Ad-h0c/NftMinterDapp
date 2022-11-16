import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { currentAccount: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function ConnectWallet() {
  const [currentAccount, setCurrentAccount] = useGlobalState("currentAccount");

  const checkIfAccountChanged = async () => {
    try {
      const { ethereum } = window;
      ethereum.on("accountsChanged", (accounts) => {
        // console.log("Account changed to:", accounts[0]);
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const changeChainId = async () => {
  //   const { ethereum } = window;
  //   const chainId = await ethereum.request({ method: "eth_chainId" });
  //   const Binance = "0x56";
  //   if (chainId !== Binance) {
  //     try {
  //       await ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: "0x56" }], // chainId must be in hexadecimal numbers
  //       });
  //     } catch (error) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       // if it is not, then install it into the user MetaMask
  //       if (error.code === 4902) {
  //         try {
  //           await ethereum.request({
  //             method: "wallet_addEthereumChain",
  //             params: [
  //               {
  //                 chainId: "0x56",
  //                 rpcUrl: "https://bsc-dataseed1.binance.org",
  //               },
  //             ],
  //           });
  //         } catch (addError) {
  //           console.error(addError);
  //         }
  //       }
  //     }
  //   }
  // };

  const getCurrentWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("get metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log("connected!", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfAccountChanged();
    getCurrentWalletConnected();
  });
  return [currentAccount, connectWallet];
}
