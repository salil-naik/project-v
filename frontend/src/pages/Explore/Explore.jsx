import React, { useState } from 'react'
import axios from 'axios';

import { Search } from '../../components/Search';
import style from "./explore.module.scss";

function Explore({ match }) {
    const {
        params: { address },
      } = match;

      const [selected, setSelected] = useState('Tokens');

      const [tokenBalances, setTokenBalances] = useState([]);
      const [totalBalance, setTotalBalance] = useState(0);

      const [NFTs, setNFTs] = useState([]);
      const [totalNFTs, setTotalNFTs]  = useState(0);
      //const [NFTs, setNFTs] = useState([]);

      React.useEffect(() => {                    
        axios
        .get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${address}/chain/1/`)
        .then((result) => {setTokenBalances(result.data.tokens); let total = 0; for(let token of result.data.tokens){total += token.USD_value}; setTotalBalance(total)});
        //other chains
        // axios
        // .get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${address}/chain/1/`)
        // .then((result) => {setTokenBalances(result.data.tokens); let total = 0; for(let token of result.data.tokens){total += token.USD_value}; setTotalBalance(total)});
    
        axios
        .get(`https://project-v.salilnaik.repl.co/NFTs/address/${address}/chain/1/`)
        .then((result) => {console.log(result.data.items); setNFTs(result.data.items); let total = 0; for(let token of result.data.items){total += parseFloat(token.balance); }; setTotalNFTs(total)} );
    
    }, [address, totalBalance])

    
   
    return(
        <div>
            <Search address={address}/>
            <h2>{address}'s Wallet</h2>

            <button onClick={() => setSelected('Tokens')} className={`${selected==='Tokens'?style.selectedButton:''}`}>Token Balances</button>
            <button onClick={() => setSelected('AllNFTs')} className={`${selected==='AllNFTs'?style.selectedButton:''}`}>All NFTs</button>
            
            { 
            (selected==='Tokens')?(
            (tokenBalances.length != 0)? 
            <div>
                <h2>Token balances</h2>
                <p>Total balance: ${totalBalance}</p>
                {tokenBalances.map((token) => 
                
                    <div key={token.contract_ticker_symbol}>
                        
                    <h3>{token.contract_name} ({token.contract_ticker_symbol})</h3>
                    <img src={token.logo_url} alt="Token Logo" width="50px"/>
                    <p>Balance: {token.balance} (${token.USD_value})</p>
                    <hr/>
                    </div>
                )}
            </div> :
            <h2>Loading {address}'s token balances...</h2>):<div></div>
                }
            { (selected==='AllNFTs')?(
                (NFTs.length != 0)? 
            <div>
                
                <h2>NFTs</h2>
                {totalNFTs}
                {NFTs.map((token) => 
                
                    <div key={token.contract_ticker_symbol}>
                        
                    <h3>{token.contract_name} ({token.contract_ticker_symbol})</h3>
                    {(token.nft_data)?(token.nft_data.length>0?(token.nft_data[0].external_data?<img src={token.nft_data[0].external_data.image} alt={token.description} style={{maxWidth:'500px'}}/>:"no image"):"no image"):"no image"}
                    <p>Balance: {token.balance}</p>
                    <hr/>
                    </div>
                )}
            </div> :
            <h2>Loading {address}'s NFTs...</h2>):<div></div>
            }
            {
                //(selected!=='AllNFTs' && selected!=='Tokens')?
            }
        </div>
    )
}

export default Explore;