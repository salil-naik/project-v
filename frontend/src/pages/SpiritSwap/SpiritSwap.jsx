import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Grid, Tab, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import style from "./spiritswap.module.scss";

export const SpiritSwap = () => {

  const [spiritGeneralData, SetSpiritGeneralData] = useState([]);

  useEffect(() => {
    axios.get('https://api.covalenthq.com/v1/250/xy=k/spiritswap/tokens/?key=ckey_086954bc66ff4028acf22c966c2')
      .then(result => {
        console.log(result.data.data.items);
        SetSpiritGeneralData(result.data.data.items);
      })
  }, [])
  return (
    <div>
                  <table>
                <thead>
                  <tr>
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


            <tr key={ index }>
                  
                  </tr>


            )
        })
          }
        </tbody>
        </table>
    </div>
  )
};
