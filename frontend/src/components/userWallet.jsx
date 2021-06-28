
import { ethers } from "ethers";

import {useEffect, useState, useRef} from 'react';

import axios from 'axios';

import { networkData } from '../scripts/network';

import { ReceiveTokenModal } from './Modal/ReceiveToken/index';
import { SendTokenModal } from './Modal/SendToken/index';
import { SentimentDissatisfiedSharp } from "@material-ui/icons";

const WalletAddresses = (props) => {

    const [chosenBalances, SetChosenBalances] = useState(true)
    

    
    return(
        <div> 
            <div style={{display: "flex", justifyContent: "flex-end"}}>

                <label htmlFor="current-address"> Choose Address : </label> 

                <select name="current-address" id="current-address" onChange={(e) => props.SetCurrentAddress(e.target.value)}> 
                    {
                        props.address.map((element, index) => {
                            return(
                                <option value={index} key={index}> {element.address} </option>
                            )
                        })
                    }

                </select>
            </div>

            <div style={{display : "flex", justifyContent : "space-around"}}> 
                <button onClick={() => SetChosenBalances(true)}> Balances </button>
                <button onClick={() => {
                    props.getTransactions();
                    SetChosenBalances(false)
                }}> Transactions </button>
            </div>

            {
                chosenBalances ? 
                <table> 
                <thead> 
        
                    <tr>
                    <th> Balances </th>
                    </tr>
                    </thead>
                    <tbody> 
                        {
                            props.balances.map((element, index) => {
                                return(
                                    <tr key={index}>
                                    <th> <img src={element.logo_url} width="20px" /></th>
                                    <th> {element.contract_ticker_symbol} </th>
                                    <th> {element.balance} </th>
                                    <th> {element.USD_value} </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                : 
                <div> 

                    <div> 
                        <div>
                            {/* <img src="https://logos.covalenthq.com/tokens/0x4e15361fd6b4bb609fa63c81a2be19d873717870.png" width="25px"/>
                            <div> Fantom </div> 
                            <div> 10 FTM </div>
                            <div> $100 </div>
                            <div> Received </div> */}

                        </div>
  
                    </div>
                </div>
            }

        </div>
    )
}

const Transaction = (props) => {

    // console.log(props.network);

    // Network By default is Kovan
    let networkChosen = props.network;
    

    const provider = new ethers.providers.JsonRpcProvider(networkChosen);
    const signer = provider.getSigner()


    const sendEth = async () => {
        const walletPrivateKey = new ethers.Wallet(props.address[0].privateKey);

        // console.log(walletPrivateKey);

        const wallet = walletPrivateKey.connect(provider)

        // console.log(wallet);

        let sendAddressInput = document.getElementById('send-address-input').value;
        let sendTokenInput = document.getElementById('send-token-input').value;

        let tx = {
            to: sendAddressInput,
            value: ethers.utils.parseEther(sendTokenInput)
          }
          
          // Signing a transaction
          await wallet.sendTransaction(tx)
          .then(result => {
              console.log(result);
          })
    }

    return(
        <div>
            {/* <input id="send-token-input" placeholder="1 ETH" required/>
            <input id="send-address-input" placeholder="0xbbbaaD77908e7143B6b4D543abefd08568f63" required/>
            <button onClick={sendEth}> Send </button> */}
        </div>
    )
}

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

function UserWallet(props) {

    // const [counter, setCounter] = useState(0);

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

    const [transactions, SetTransactions] = useState();

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
            // console.log(result.data);
            SetTransactions(result.data)
            return true;
        })
        .catch(err => console.log(err));
    }


    return(
        <div style={{color : "white"}}>
                {/* <div onClick={getBalance}>{ props.address[currentAddress].address }</div>  */}

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
              
                    <WalletAddresses transactions={transactions} network={network} address={props.address} balances={balances} SetCurrentAddress = {SetCurrentAddress} setReceiveTokenState={setReceiveTokenState} setSendTokenState={setSendTokenState} setTokenData = {setTokenData} getTransactions={getTransactions}/>

                </div>

                : <div> Not Verified </div>
            }

        

            <Transaction network={network} address={props.address} />
            
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

export default UserWallet;