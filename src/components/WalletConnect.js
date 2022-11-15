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

  const changeChainId = async () => {
    const { ethereum } = window;
    const chainId = await ethereum.request({ method: "eth_chainId" });
    const Goerli = "0x5";
    if (chainId !== Goerli) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x5",
                  rpcUrl: "https://goerli.infura.io/v3/",
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    }
  };
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
      changeChainId();
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
    changeChainId();
    getCurrentWalletConnected();
  });
  return [currentAccount, connectWallet];
}
