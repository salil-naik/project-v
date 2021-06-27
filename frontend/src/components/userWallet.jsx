
import { ethers } from "ethers";

import {useEffect, useState} from 'react';

import axios from 'axios';


const WalletAddresses = (props) => {

    const changeAddress = (value) => {
        props.changeData(props.address[value].address, props.address[value].privateKey)

        // props.SetCurrentAddressChosen();
        // props.SetCurrentPrivateKeyChosen();
    }

    return(
        <div> 
            <div style={{display: "flex", justifyContent: "flex-end"}}>

                <label htmlFor="current-address"> Choose Address : </label> 

                <select name="current-address" id="current-address" onChange={(e) => changeAddress(e.target.value)}> 
                    {
                        props.address.map((element, index) => {
                            return(
                                <option value={index} key={index}> {element.address} </option>
                            )
                        })
                    }

                </select>
            </div>
            <div>  <p> Chosen address : {props.currentAddressChosen} </p> </div>
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
        const walletPrivateKey = new ethers.Wallet(props.currentPrivateKeyChosen);

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

function UserWallet(props) {

    const [currentAddressChosen, SetCurrentAddressChosen] = useState(props.address[0].address);
    const [currentPrivateKeyChosen, SetCurrentPrivateKeyChosen] = useState(props.address[0].privateKey);


    // useEffect(() => {
    //     SetCurrentAddressChosen();
    //     SetCurrentPrivateKeyChosen();

    // }, [])

    const getBalance = () => {
        let networkChosen = props.network;

        console.log(currentAddressChosen);
    
        const provider = new ethers.providers.JsonRpcProvider(networkChosen);
        // console.log(chainID);
        axios.get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${currentAddressChosen}/chain/${props.chainID}/`)
            .then(result => {
                console.log(result.data.tokens);
                props.setBalances(result.data.tokens)
            })
            .catch(err => console.log(err));
    }


    const changeData = (add, priv) => {
        SetCurrentAddressChosen(add);
        SetCurrentPrivateKeyChosen(priv);
    }

    const gettt = () => {
    setInterval(()=> {
        getBalance();
    }, 5000);
    }

    return(
        <div>
            <p onClick={gettt}>  {currentAddressChosen}</p>
            <div style={{display: "flex", justifyContent : "flex-end"}}>
                <label htmlFor="network">Choose a network:</label> 

                <select defaultValue="kovan" name="network" id="network-connected" onChange={(e) => props.changeNetwork(e.target.value)}>
                <option value="kovan">Kovan</option>
                <option value="ethereum">Etheruem Mainnet</option>
                <option value="fantom-testnet">Fantom Testnet</option>
                <option value="fantom-mainnet">Fantom Mainnet</option>
                </select>
            </div>

            {
                props.verified ? 
                <div>
                    <WalletAddresses network={props.network} address={props.address} balances={props.balances} changeData={changeData} currentAddressChosen={props.currentAddressChosen}/>
                    <button onClick={props.addNewAddress}> Add new address </button>
                </div>

                : <div> Not Verified </div>
            }
        
            
            <Transaction network={props.network} currentAddressChosen={currentAddressChosen} currentPrivateKeyChosen= {currentPrivateKeyChosen} />
            
        </div>
    )
}

export default UserWallet;