import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import style from "./wallet.module.scss";

export const WalletAddresses = (props) => {
  const [chosenBalances, SetChosenBalances] = useState(true);
  const [value, setValue] = useState(1);
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <label htmlFor="current-address"> Choose Address : </label>
        <select
          name="current-address"
          id="current-address"
          onChange={(e) => props.SetCurrentAddress(e.target.value)}
        >
          {props.address.map((element, index) => {
            return (
              <option value={index} key={index}>
                {" "}
                {element.address}{" "}
              </option>
            );
          })}
        </select>
      </div> */}

      <div className={style.balanceContainer}>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleTabs}
            indicatorColor="primary"
            TabIndicatorProps={{
              style: {
                height: "5px",
              },
            }}
            className={style.tabLabel}
          >
            <Tab label="Balances in wallet" value={1} />
            <Tab
              label="Transactions"
              value={2}
              onClick={() => {
                props.getTransactions();
              }}
              className={style.tabLabel}
            />
          </Tabs>

          <TabPanel value={1} style={{ padding: "0" }}>
            <table>
              <tbody>
                {props.balances.map((element, index) => {
                  return (
                    <tr key={index}>
                      <th>
                        {" "}
                        <img src={element.logo_url} width="20px" />
                      </th>
                      <th> {element.contract_ticker_symbol} </th>
                      <th> {element.balance} </th>
                      <th> {element.USD_value} </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value={2} style={{ padding: "0" }}>
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
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};
