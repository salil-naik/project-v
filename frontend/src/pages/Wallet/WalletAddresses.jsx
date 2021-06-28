import { useState } from 'react';

export const WalletAddresses = (props) => {

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
                            {console.log(props.transactions)}

                        </div>
  
                    </div>
                </div>
            }

        </div>
    )
}