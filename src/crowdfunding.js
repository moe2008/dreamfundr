import Web3 from "web3";
import CrowdfundingContract from "../src/contracts/Crowdfunding.json";

// Stellen Sie sicher, dass MetaMask oder ein anderer Ethereum-Provider vorhanden ist
const web3 = new Web3(window.ethereum || Web3.givenProvider);

// Falls der Benutzer eine Wallet-Verbindung akzeptieren muss
if (window.ethereum) {
  try {
    // Bitten Sie den Benutzer um Erlaubnis, sich zu verbinden
    await window.ethereum.enable();
  } catch (error) {
    console.error("Benutzer hat den Zugriff verweigert");
  }
} else {
  console.error(
    "Kein Ethereum-Provider gefunden. Bitte installieren Sie MetaMask."
  );
}

const contractAddress = "0x2D0Af7Bd9Be7F7e5abFB745e44Af994CfC72dCD7";
const crowdfunding = new web3.eth.Contract(
  CrowdfundingContract.abi,
  contractAddress
);

export default crowdfunding;
