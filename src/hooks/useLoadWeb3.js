import { useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  const initializeWeb3 = async () => {
    if (window.ethereum || window.web3) {
      const web3Instance = new Web3(
        window.ethereum || window.web3.currentProvider
      );
      setWeb3(web3Instance);
      return web3Instance;
    } else {
      setErrorMsg(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return null;
    }
  };

  const loadWeb3 = async () => {
    const web3Instance = await initializeWeb3();
    if (web3Instance) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setWeb3(web3Instance);
        setAccounts(accounts);
      } catch (error) {
        console.error("User denied account access");
        setErrorMsg("User denied account access. Wallet not connected.");
      }
    }
  };

  return { web3, accounts, errorMsg, loadWeb3, initializeWeb3 };
};

export default useWeb3;
