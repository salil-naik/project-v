import React, { useState } from 'react'
import axios from 'axios';

import { Search } from '../../components/Search';
import style from "./explore.module.scss";

function Explore({ match }) {
    const {
        params: { address },
    } = match;

    const [selected, setSelected] = useState('Tokens');
    const [selectedContract, setSelectedContract] = useState('AllNFTs');

    const [tokenBalances, setTokenBalances] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    const [NFTs, setNFTs] = useState([]);
    const [SegregatedNFTs, setSegregatedNFTs] = useState({ 'test': [1, 2, 3] });
    const [NFTContracts, setNFTContracts] = useState([]);
    const [totalNFTs, setTotalNFTs] = useState(0);

    /*
        React.useEffect(() => {
            axios
                .get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${address}/chain/1/`)
                .then((result) => { setTokenBalances(result.data.tokens); let total = 0; for (let token of result.data.tokens) { total += token.USD_value }; setTotalBalance(total) });
            //other chains
            // axios
            // .get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${address}/chain/1/`)
            // .then((result) => {setTokenBalances(result.data.tokens); let total = 0; for(let token of result.data.tokens){total += token.USD_value}; setTotalBalance(total)});
    
            axios
                .get(`https://project-v.salilnaik.repl.co/NFTs/address/${address}/chain/1/`)
                .then((result) => {
                    console.log(result.data.items);
                    setNFTs(result.data.items);
                    let total = 0;
                    console.log("Should appear only once")
                    for (let token of result.data.items) {
                        total += parseFloat(token.balance);
    
                        // let copyNFTs = JSON.parse(JSON.stringify(SegregatedNFTs));
                        // if(token.contract_name in copyNFTs && token.contract_name) {
                            
                        //     copyNFTs[token.contract_name] = copyNFTs[token.contract_name].concat(token.nft_data);
                        
                        // } else {
                        //     console.log('copying...', copyNFTs[token.contract_name]);
                        //     copyNFTs[token.contract_name] = token.nft_data;
                        // }
                        
                        // copyNFTs[token.contract_name] = token.nft_data;
                        let key = token.contract_name;
                        
                        if(token.nft_data){
                            let tempObj = {};
                            tempObj[token.contract_name] = token.nft_data;
                            let obj = {...SegregatedNFTs, ...tempObj};
                            console.log('adding', {...SegregatedNFTs, ...tempObj})
                            setSegregatedNFTs(obj);
                        }
                            
    
                        
                        // if(!( NFTContracts.includes(token.contract_name)))
                        // {const copyContracts = [...NFTContracts];
                        //     copyContracts.push(token.contract_name);
                        // setNFTContracts(copyContracts);
                        // }
                        
                        if(!( NFTContracts.includes(token.contract_name))){
                            const copyContracts = NFTContracts;
                            copyContracts.push(token.contract_name);
                            setNFTContracts(copyContracts);
                        }
                        
                        
                    };
                    setInterval(()=>{console.log('NFTs', SegregatedNFTs)}, 1000)
                    
                    setTotalNFTs(total)
                });
    
        }, [])
    
    */

    return (
        <div>
            <Search address={address} />
            <select>
                <option value="1">Ethereum Mainnet</option>
                <option value="saab">Fantom Mainnet</option>
                <option value="mercedes">Mercedes</option>
            </select>
            <h2>{address}'s Wallet</h2>

            <button onClick={() => setSelected('Tokens')} className={`${selected === 'Tokens' ? style.selectedButton : ''}`}>Token Balances</button>
            <button onClick={() => setSelected('NFTs')} className={`${selected === 'NFTs' ? style.selectedButton : ''}`}>NFTs</button>
            <br />

            {(NFTs.length !== 0 && selected === 'NFTs') ?
                <div>
                    <button onClick={() => setSelectedContract('AllNFTs')} className={`${selectedContract === 'AllNFTs' ? style.selectedButton : ''}`}>All NFTs</button>
                    {NFTContracts.map((contract) => (
                        <button key={contract} onClick={() => setSelectedContract(contract)} className={`${selectedContract === contract ? style.selectedButton : ''}`}>{contract}</button>
                    ))}</div> : ''

            }
            {
                (selected === 'Tokens') ? (
                    (tokenBalances.length !== 0) ?
                        <div>
                            <h2>Token balances</h2>
                            <p>Total balance: ${totalBalance}</p>
                            {tokenBalances.map((token) =>

                                <div key={token.contract_ticker_symbol}>

                                    <h3>{token.contract_name} ({token.contract_ticker_symbol})</h3>
                                    <img src={token.logo_url} alt="Token Logo" width="50px" />
                                    <p>Balance: {token.balance} (${token.USD_value})</p>
                                    <hr />
                                </div>
                            )}
                        </div> :
                        <h2>Loading {address}'s token balances...</h2>) : <div></div>
            }
            {(selected === 'AllNFTs') ? (
                (NFTs.length !== 0) ?
                    <div>

                        <h2>NFTs</h2>
                        Total NFTs{totalNFTs}
                        {NFTs.map((token) =>

                            <div key={token.contract_ticker_symbol}>

                                <h3>{token.contract_name} ({token.contract_ticker_symbol})</h3>
                                {(token.nft_data) ? (token.nft_data.length > 0 ? (token.nft_data[0].external_data ? <img src={token.nft_data[0].external_data.image} alt={token.description} style={{ maxWidth: '500px' }} /> : "no image") : "no image") : "no image"}
                                <p>Balance: {token.balance}</p>
                                <hr />
                            </div>
                        )}
                    </div> :
                    <h2>Loading {address}'s NFTs...</h2>) : <div></div>
            }
            {/* {   //(selected!=='AllNFTs' && selected!=='Tokens')?
                (selected!=='AllNFTs' && selected!=='Tokens' && NFTs.length !== 0) ?
                    <div>
                        { SegregatedNFTs[selectedContract].map((nft) =>
                            (
                            < div key = { nft.external_data.name } >


                            {(nft.external_data ? <img src={nft.external_data.image} alt={nft.external_data.description} style={{ maxWidth: '500px' }} /> : "no image") }
                        <p>{ nft.external_data.name }</p>
                        
                        <hr />
                    </div>
))}
        </div>: <div>
        </div>

} */}
        </div >
    )
}

export default Explore;