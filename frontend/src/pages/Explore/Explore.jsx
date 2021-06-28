import React, { useState } from 'react'
import axios from 'axios';

import { Search } from '../../components/Search';
import style from "./explore.module.scss";

function Explore({ match }) {
    const {
        params: { address },
    } = match;

    const [network, setNetwork] = useState(1)

    const [selected, setSelected] = useState('Tokens');
    const [selectedContract, setSelectedContract] = useState('AllNFTs');

    const [tokenBalances, setTokenBalances] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    const [NFTs, setNFTs] = useState([]);
    const [SegregatedNFTs, setSegregatedNFTs] = useState({});
    const [NFTContracts, setNFTContracts] = useState(new Set());
    const [totalNFTs, setTotalNFTs] = useState(0);


    React.useEffect(() => {
        axios
            .get(`https://project-v.salilnaik.repl.co/TokenBalances/address/${address}/chain/${network}/`)
            .then((result) => { setTokenBalances(result.data.tokens); let total = 0; for (let token of result.data.tokens) { total += token.USD_value }; setTotalBalance(total) });

        axios
            .get(`https://project-v.salilnaik.repl.co/NFTs/address/${address}/chain/${network}/`)
            .then((result) => {
                console.log(result.data.items);
                setNFTs(result.data.items);
                let total = 0;
                console.log("Should appear only once")
                for (let token of result.data.items) {
                    total += parseFloat(token.balance);


                    if (token.nft_data) {
                        if (token.nft_data.length > 0) {
                            let tempObj = {};
                            tempObj[token.contract_name] = token.nft_data;
                            setSegregatedNFTs(prevState => { return { ...prevState, ...tempObj } });
                            setNFTContracts(prevState => { return new Set([...prevState, token.contract_name]) });
                        }



                    }







                };


                setTotalNFTs(total)
            });

    }, [address, network])

    // React.useEffect(() => {
    //     console.log('segregated nft:', SegregatedNFTs)
    // },[SegregatedNFTs])

    const getNetwork = (e) => {
        setNetwork(e.target.value);
    }
    return (
        <div>
            <Search address={address} />
            <br />
            <label>Choose network:</label>
            <select onChange={getNetwork}>
                <option value="1">Ethereum Mainnet</option>
                <option value="250">Fantom Mainnet</option>
                <option value="42">Kovan</option>
                <option value="4002">Fantom Testnet</option>
            </select>
            <h2>{address}'s Wallet</h2>

            <button onClick={() => setSelected('Tokens')} className={`${selected === 'Tokens' ? style.selectedButton : ''}`}>Token Balances</button>
            <button onClick={() => setSelected('NFTs')} className={`${selected === 'NFTs' ? style.selectedButton : ''}`}>NFTs</button>
            <br />

            {(NFTs.length !== 0 && selected === 'NFTs') ?
                <div>
                    <button onClick={() => { console.log(SegregatedNFTs, JSON.stringify(SegregatedNFTs)); setSelectedContract('AllNFTs') }} className={`${selectedContract === 'AllNFTs' ? style.selectedButton : ''}`}>All NFTs</button>
                    {Array.from(NFTContracts).map((contract) => (
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
            {(selected === 'NFTs' && selectedContract === 'AllNFTs') ? (
                (SegregatedNFTs && NFTs.length !== 0) ?
                    <div>

                        <h2>NFTs</h2>
                        Total NFTs{totalNFTs}
                        {
                            Object.keys(SegregatedNFTs).map(contract => (
                                SegregatedNFTs[contract].map((nft) =>
                                (
                                    (nft.external_data)?
                                    < div key={nft.external_data.name} >
                                        <img src={nft.external_data.image} alt={nft.external_data.description} style={{ maxWidth: '500px' }} />
                                        <p>{nft.external_data.name}</p>

                                        <hr />
                                    </div>:''
                                ))
                            ))
                        }
                        {/* {NFTs.map((token) =>

                            <div key={token.contract_ticker_symbol}>

                                <h3>{token.contract_name} ({token.contract_ticker_symbol})</h3>
                                {(token.nft_data) ? (token.nft_data.length > 0 ? token.nft_data.map( (nft) => (nft.external_data ? <img src={nft.external_data.image} alt={nft.description} style={{ maxWidth: '500px' }} /> : "no image")) : "no image") : "no image"}
                                <p>Balance: {token.balance}</p>
                                <hr />
                            </div>
                        )} */}
                    </div> :
                    <h2>Loading {address}'s NFTs...</h2>) : <div></div>
            }
            {   //(selected!=='AllNFTs' && selected!=='Tokens')?
                (selected === 'NFTs' && selected !== 'Tokens' && selectedContract !== 'AllNFTs' && NFTs.length !== 0) ?
                    <div>

                        {SegregatedNFTs[selectedContract].map((nft) =>
                        (
                            < div key={nft.external_data.name} >


                                {(nft.external_data ? <img src={nft.external_data.image} alt={nft.external_data.description} style={{ maxWidth: '500px' }} /> : "no image")}
                                <p>{nft.external_data.name}</p>

                                <hr />
                            </div>
                        ))}
                    </div> : <div>
                    </div>

            }
        </div >
    )
}

export default Explore;