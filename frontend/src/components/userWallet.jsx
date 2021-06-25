
import { ethers } from "ethers";

const WalletAddresses = (props) => {

    console.log(props);

    return(
        <div> 
        <table> 
            <thead> 
            <tr>
            <th> Private Key </th>
            <th> Public Key </th>
            </tr>
            </thead>
            <tbody> 
            {
                props.address.map((element,index) => {
                    return (
                        <tr key={index}>
                            <th> {element.privateKey} </th>
                            <th> {element.address}</th>

                        </tr>
                        )
                })
            }
            </tbody>

        </table>
        <table> 
        <thead> 
            <tr>
            <th> Token </th>
            <th> Balance </th>
            </tr>
            </thead>
            <tbody> 
                {
                    props.balances.map(element => {
                        return(
                            <tr>
                            <th> {element.contract_ticker_symbol} </th>
                            <th> {((element.balance) / Math.pow(10, element.contract_decimals))} </th>
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

    console.log(props.network);

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

function UserWallet(props) {
    return(
        <div>
            
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
                    <WalletAddresses network={props.network} address={props.address} balances={props.balances}/>
                    <button onClick={props.addNewAddress}> Add new address </button>
                </div>

                : <div> Not Verified </div>
            }
        
            
            <Transaction network={props.network} address={props.address}/>
            
        </div>
    )
}

export default UserWallet;