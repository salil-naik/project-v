import { ethers } from "ethers";

import {useEffect, useState, useRef} from 'react';

import axios from 'axios';

import { networkData } from  '../../scripts/network.js';

import { ReceiveTokenModal } from '../../components/Modal/ReceiveToken/index';
import { SendTokenModal } from '../../components/Modal/SendToken/index';
import { SentimentDissatisfiedSharp } from "@material-ui/icons";

import { WalletAddresses } from './WalletAddresses';

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

export const Wallet = (props) => {

    useInterval(() => {
        getBalance()
      }, 5000);
    
  
      const [network, SetNetwork] = useState(networkData.kovan.rpc);
      const [chainID, SetChainID] = useState(networkData.kovan.chainID);
      const [balances, setBalances] = useState([]);
      const [currentAddress, SetCurrentAddress] = useState(0);
  
      const [receiveTokenState, setReceiveTokenState] = useState(false);
      const [sendTokenState, setSendTokenState] = useState(false);
      const [tokenData, setTokenData] = useState()
  
      const [transactions, SetTransactions] = useState([]);
  
      const openReceiveToken = () => {
          setReceiveTokenState(true);
          setSendTokenState(false);
      }
  
      const openSendToken = () => {
          setReceiveTokenState(false);
          setSendTokenState(true);
      }
  
      const handleClose = () => {
          setReceiveTokenState(false);
          setSendTokenState(false);
      }
  
      const changeNetwork = (input) => {
          // console.log(input);
          console.log("Network is changing");
          switch(input) {
              case "kovan":
                  SetNetwork(networkData.kovan.rpc);
                  SetChainID(networkData.kovan.chainID);
                  console.log("kovan");
                  break;
  
              case "ethereum":
                  SetNetwork(networkData.ethereumMainnet.rpc);
                  SetChainID(networkData.ethereumMainnet.chainID);
                  console.log("eth");
  
                  break;
              
              case "fantom-testnet":
                  SetNetwork(networkData.fantomTestnet.rpc)
                  SetChainID(networkData.fantomTestnet.chainID);
                  console.log("fantom");
  
                  break;
  
              case "fantom-mainnet":
                  SetNetwork(networkData.fantomMainnet.rpc);
                  SetChainID(networkData.fantomMainnet.chainID);
                  console.log("fantom main");
  
                  break;
          }
      }
  
      const getBalance = () => {
          let networkChosen = network;
      
          const provider = new ethers.providers.JsonRpcProvider(networkChosen);
          // console.log(chainID);
  
          // console.log(props.address[currentAddress].address);
  
          axios.get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${props.address[currentAddress].address}/chain/${chainID}/`)
              .then(result => {
                  console.log(result.data.tokens);
                  setBalances(result.data.tokens)
                  return true;
              })
              .catch(err => console.log(err));
      }
  
      const getTransactions = () => {
          axios.get(`https://project-v.salilnaik.repl.co/Transactions/address/${props.address[currentAddress].address}/chain/${chainID}`)
          .then(result => {
              console.log(result.data);
              SetTransactions(result.data)
              return true;
          })
          .catch(err => console.log(err));
      }


      return(
        <div style={{color : "white"}}>

            {
                props.verified ? 
                <div>
                    <div onClick={openSendToken}> Send </div>
                    <div onClick={openReceiveToken}> Receive </div>

                    <div style={{display: "flex", justifyContent : "flex-end"}}>
                            <label htmlFor="network">Choose a network:</label> 
                            <select defaultValue="kovan" name="network" id="network-connected" onChange={(e) => {changeNetwork(e.target.value)}}>
                            <option value="kovan">Kovan</option>
                            <option value="ethereum">Etheruem Mainnet</option>
                            <option value="fantom-testnet">Fantom Testnet</option>
                            <option value="fantom-mainnet">Fantom Mainnet</option>
                            </select>
                            <button onClick={props.addNewAddress}> Add new address </button>
                     </div>
              
                    <WalletAddresses
                    transactions={transactions}
                    network={network}
                    address={props.address}
                    balances={balances}
                    SetCurrentAddress ={SetCurrentAddress}
                    setReceiveTokenState={setReceiveTokenState}
                    setSendTokenState={setSendTokenState}
                    setTokenData = {setTokenData}
                    getTransactions={getTransactions}
                    />

                </div>

                : <div> Not Verified </div>
            }

    
            
            <ReceiveTokenModal
                    open={receiveTokenState}
                    onClose={handleClose}
                    data={balances}
                    walletAddress = {props.address[currentAddress].address}
                />

                {/* Verify Modal */}
                <SendTokenModal
                    open={sendTokenState}
                    onClose={handleClose}
                    data={balances}
                    network = {network}
                    walletData = {props.address[currentAddress]}
                />
        </div>
    )
}