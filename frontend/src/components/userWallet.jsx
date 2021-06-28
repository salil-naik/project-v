
import { ethers } from "ethers";

import {useEffect, useState} from 'react';

import axios from 'axios';

import { networkData } from '../scripts/network'


const WalletAddresses = (props) => {


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
                            <th> Send </th>
                            <th> Deposit </th>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
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

        console.log(walletPrivateKey);

        const wallet = walletPrivateKey.connect(provider)

        console.log(wallet);

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
            <input id="send-token-input" placeholder="1 ETH" required/>
            <input id="send-address-input" placeholder="0xbbbaaD77908e7143B6b4D543abefd08568f63" required/>
            <button onClick={sendEth}> Send </button>
        </div>
    )
}

function Receive() {
    return(
        <div> 
            Deposits
        </div>
    )
}

function Send() {
    return(
        <div> 
            Send
        </div>
    )
}

function UserWallet(props) {

    const [network, SetNetwork] = useState(networkData.kovan.rpc);
    const [chainID, SetChainID] = useState(networkData.kovan.chainID);
    const [balances, setBalances] = useState([]);
    const [currentAddress, SetCurrentAddress] = useState(0);


    useEffect(() => {
        // setInterval(()=> {
        //     getBalance();
        // }, 4000);

        console.log(networkData);
    }, [])

    const changeNetwork = (input) => {
        console.log(input);
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
        console.log(chainID);

        console.log(props.address[currentAddress].address);

        axios.get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${props.address[currentAddress].address}/chain/${chainID}/`)
            .then(result => {
                console.log(result.data.tokens);
                setBalances(result.data.tokens)
            })
            .catch(err => console.log(err));


        setTimeout(() => {
            console.log(chainID, network);
        }, 10000) 
    }

    sendToken = () => {

    }

    receiveToken = () => {
        
    }



    return(
        <div>
                <p onClick={getBalance}>{ props.address[currentAddress].address }</p> 

            {
                props.verified ? 
                <div>
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

                    <WalletAddresses network={network} address={props.address} balances={balances} SetCurrentAddress = {SetCurrentAddress} />

                </div>

                : <div> Not Verified </div>
            }

        
            <div className="wallet-receive-modal"> 

                <Receive /> 

            </div>

            <div className="wallet-send-modal"> 

                <Send /> 

            </div>
        
           
            <Transaction network={network} address={props.address} />
            
            
        </div>
    )
}

export default UserWallet;