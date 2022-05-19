import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import detectEthereumProvider from "@metamask/detect-provider";
import { CubeSpinner } from "react-spinners-kit";


import Web3, {walletConnect} from "../../config.main.web3";
import { iOS } from "../../utils/browser";
import styles from "./styles.module.scss";

function Wallets() {
  const [accountData, setAccountData] = useState({
    publicAddress: localStorage.getItem("currentWalletShort") || null,
    originalAddress: localStorage.getItem("currentWallet") || null,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentProvider, setCurrentProvider] = useState();
  const [currentAddressWallet, setCurrentAddressWallet] = useState();

  const handleToggleDrawer = () => setOpen(!open);

  const handleReset = () => {
    setAccountData({ publicAddress: null, originalAddress: null });
    localStorage.removeItem("currentWalletShort");
    localStorage.removeItem("currentWallet");
  };

  function getAddress(originalAdress) {
    let publicAddress = "";
    if (originalAdress) {
      const firstPart = `${originalAdress.substring(0, 2)}${originalAdress
        .substring(2, 6)
        .toUpperCase()}`;
      const secondPart = `${originalAdress
        .substring(originalAdress.length - 4, originalAdress.length)
        .toUpperCase()}`;
      publicAddress = `${firstPart}...${secondPart}`;
      setCurrentAddressWallet(originalAdress);
    }
    setAccountData({ publicAddress, originalAdress });
  }

  const loadPubKeyData = async (ethProvider) => {
    await ethProvider.on("accountsChanged", (newAccount) => {
      setLoading(true);
      setTimeout(() => {
        getAddress(newAccount[0]);
        setLoading(false);
      }, 2000);
    });
    await ethProvider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xA4EC",
          chainName: "Celo",
          nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
          },
          rpcUrls: ["https://forno.celo.org"], //["https://alfajores-forno.celo-testnet.org"],
          blockExplorerUrls: ["https://explorer.celo.org"], //["https://alfajores-blockscout.celo-testnet.org"],
        },
      ],
    });
    const accounts = await ethProvider.request({ method: "eth_accounts" });
    getAddress(accounts[0]);
  };

  // const loadWeb3Provider = async () => {
  //   setLoading(true);
  //   const provider = await detectEthereumProvider();
  //   if (provider) {
  //     try {
  //       await provider.enable();
  //       const web3Loadie = Web3().web3Provider;
  //      // console.log(web3Loadie);
  //       if (web3Loadie) {
  //         loadPubKeyData(provider);
  //         setLoading(false);
  //         handleToggleDrawer();
  //       } else {
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setLoading(false);
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // };

  const loadWeb3Provider = async () => {
    setLoading(true);
    const provider = await detectEthereumProvider();
    setCurrentProvider("Metamask");
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = await Web3();
        if (web3Loadie) {
          loadPubKeyData(provider);
          setLoading(false);
          handleToggleDrawer();
        } else {
          setLoading(false);
        //  setError(502);
        }
      } catch (err) {
        setLoading(false);
       // setError(503);
      }
    } else {
      setLoading(false);
     // setError(500);
    }
  };

  const loadWalletConnectProvider = async () => {
    setLoading(true);
    try {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden" && iOS()) {
          localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
        }
      });
      const { provider } = await walletConnect();
      setCurrentProvider("WalletConnect");
      await provider.on("accountsChanged", (newAccount) => {
        setLoading(true);
        setTimeout(() => {
          getAddress(newAccount[0]);
          setLoading(false);
        }, 2000);
      });
      getAddress(provider.accounts[0]);
      setLoading(false);
      handleToggleDrawer();
    } catch (err) {
      console.log("Error ", err);
      setLoading(false);
      //setError(500);
      window.location.reload();
    }
  };

  useEffect(()=>{
    console.log(accountData)
  }, [accountData])

  return (
    <>
      {accountData.publicAddress && (
          <Button variant="contained" onClick={handleReset}>
            {accountData.publicAddress}
          </Button>
        )}

      {!accountData.publicAddress && (
        <Button variant="contained" onClick={handleToggleDrawer}>
          Conecta Tu Wallet
        </Button>
      )}

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Typography variant="h6" component="div" gutterBottom>
          Elige tu Wallet
        </Typography>
        <div className={styles.Loading}>
          {!loading && (
            <div>

            <Button variant="contained" onClick={loadWeb3Provider}>
              METAMASK
            </Button>

            <Button
              variant="contained"
              onClick={loadWalletConnectProvider}
            >
              VALORA
            </Button>
            </div>

          )}
          {loading && <CubeSpinner frontColor="#F58F98" size={30} />}
        </div>
      </Drawer>
    </>
  );
}

export default React.memo(Wallets);
