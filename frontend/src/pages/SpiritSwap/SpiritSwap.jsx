import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Grid, Tab, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import style from "./spiritswap.module.scss";

export const SpiritSwap = () => {

  const [spiritGeneralData, SetSpiritGeneralData] = useState([]);
  const [spiritPool, SetSpiritPool] = useState([]);


  useEffect(() => {
    axios.get('https://api.covalenthq.com/v1/250/xy=k/spiritswap/tokens/?key=ckey_086954bc66ff4028acf22c966c2')
      .then(result => {
        console.log(result.data.data.items);
        SetSpiritGeneralData(result.data.data.items);
      })
    
    axios.get('https://api.covalenthq.com/v1/250/xy=k/spiritswap/pools/?key=ckey_086954bc66ff4028acf22c966c2')
      .then(result => {
        console.log(result.data.data.items);
        SetSpiritPool(result.data.data.items);
    })
  }, [])


  const tokenDat = () => {
    // document.getElementsByClassName('tokens')[0].style.display = "block";
    // document.getElementsByClassName('pools')[0].style.display = "none";
  }

  const poolDat = () => {
    // document.getElementsByClassName('tokens')[0].style.display = "none";
    // document.getElementsByClassName('pools')[0].style.display = "block";
  }

  return (
    <div >
      {/* <h5> Spiritswap Data </h5>
      <button onClick={tokenDat }> Token Data </button>
      <button onClick={ poolDat}> Pool Data </button> */}

    <div className="tokens">
                <table>
                <thead>
                  <tr>
                    {/* <th> # </th> */}
                    <th> Name </th>
                    <th> Symbol </th>
                    <th> Total Liquidity </th>
                    <th> Liquidity (USD)</th>
                    <th> Quote </th>
                    <th> 24h Volume </th>
                    <th> 24h Volume (USD) </th>
                  </tr>
                </thead>
                <tbody>
      {
        spiritGeneralData.map((token, index) => {
          return (
            <tr key={index}>
              {/* <th> { index } </th> */}
              <th> {token.contract_name} </th>
              <th> {token.contract_ticker_symbol} </th>
              <th> {token.total_liquidity} </th>
              <th> {token.total_liquidity_quote} </th>
              <th> {token.quote_rate} </th>
              <th> {token.total_volume_24h} </th>
              <th> {token.total_volume_24h_quote} </th>

            </tr>
            )
        })
          }
        </tbody>
        </table>
      </div>

      <div className="pools">
                <table>
                <thead>
                   <tr>
                    {/* <th> # </th> */}
                    <th> Pair </th>
                    <th> Liquidity </th>
                    <th> Volume </th>
                    <th> 7 day Volume </th>
                    <th> Swaps (24hr) </th>
                    <th> Annual Fee</th>
                  </tr>
                </thead>
                <tbody>
      {
        spiritPool.map((pool, index) => {
          return (
            <tr key={index}>
              {/* <th> { index } </th> */}
              <th> {pool.token_0.contract_ticker_symbol}  {pool.token_1.contract_ticker_symbol}</th>
              <th> {pool.total_liquidity_quote} </th>
              <th> {pool.volume_24h_quote} </th>
              <th> {pool.volume_7d_quote } </th>
              <th> {pool.swap_count_24h} </th>

              <th> {pool.annualized_fee} </th>

            </tr>
            )
        })
          }
        </tbody>
        </table>
      </div>
      </div>
  )
};
