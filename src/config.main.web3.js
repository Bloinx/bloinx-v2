// import Web3 from "web3";
// import Main from "./abis/Main.json";
// import cUSD from "./abis/cUSD.json";

// export const MAIN_FACTORY_FUJI_TEST_NET =
//   "0xa10d0A7D36c3d529C90eb75148019f758DC43449";
// // "0x93D4bfF05EEBa0De8Ad486B7837DD11A10810d6C";
// export const MIM_TOKEN_FUJI_TEST_NET =
//   "0x765de816845861e75a25fca122bb6898b8b1282a";
// // "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; // cUSD

// export function configMin() {
//   const httpProvider = new Web3.providers.HttpProvider(
//     "https://api.avax-test.network/ext/bc/C/rpc",
//     {
//       timeout: 10000,
//     }
//   );
//   const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
//   const contract = new web3Provider.eth.Contract(cUSD, MIM_TOKEN_FUJI_TEST_NET);
//   return contract;
// }

// export default function config() {
//   const httpProvider = new Web3.providers.HttpProvider(
//     "https://api.avax-test.network/ext/bc/C/rpc",
//     {
//       timeout: 10000,
//     }
//   );

//   const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
//   const contract = new web3Provider.eth.Contract(
//     Main,
//     MAIN_FACTORY_FUJI_TEST_NET
//   );

//   return { contract, web3Provider };
// }


import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
import Main from "./abis/Main.json";

export const MAIN_FACTORY_ALFAJORES =
  "0x5379Db9Fb4e50572F161A8c3E0685448271Df72F";

export const MAIN_FACTORY_CELO_MAINNET =
  "0xaeCe4d1c7c8101bd41642bF8DBb51966B1B2E891";

export async function getContract(provider, abi, contractAddress) {
  const contract = await new provider.eth.Contract(abi, contractAddress);
  return contract;
}

export default async function configM() {
  try {
    const httpProvider = new Web3.providers.HttpProvider(
      "https://forno.celo.org",
      {
        timeout: 10000,
      }
    );

   // const web3Providerjeje = new Web3("https://forno.celo.org");

    const web3Provider = new Web3(
      "https://forno.celo.org"
    );
    const contract = await getContract(
      web3Provider,
      Main,
      MAIN_FACTORY_CELO_MAINNET
    );

    return { contract, web3Provider };
  } catch (error) {
    return error;
  }
}

export async function walletConnect() {
  const provider = new WalletConnectProvider({
    rpc: {
      44787: "https://alfajores-forno.celo-testnet.org",
      42220: "https://forno.celo.org",
    },
  });
  await provider.enable();
  const web3Provider = new Web3(provider);
  const kit = newKitFromWeb3(web3Provider);
  // eslint-disable-next-line prefer-destructuring
  kit.defaultAccount = provider.accounts[0];
  kit.defaultFeeCurrency = await kit.contracts.getStableToken();

  const contract = await getContract(kit.web3, Main, MAIN_FACTORY_CELO_MAINNET);
  return { contract, provider };
}

