import Web3 from "web3";
import SavingGroups from "./abis/SavingGroups.json";

export default function config(savingGroupAddress) {
  const addressSavingGroupsParse = new Web3.utils.toChecksumAddress(savingGroupAddress);

//window.ethereum || httpProvider
  const web3Provider = new Web3("https://forno.celo.org");

  const contract = new web3Provider.eth.Contract(
    SavingGroups,
    addressSavingGroupsParse
  );

  contract.options.address=savingGroupAddress;

  return contract;
}