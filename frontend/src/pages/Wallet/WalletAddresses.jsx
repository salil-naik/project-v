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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <label htmlFor="network">Choose a network:</label>
        <select
          defaultValue="kovan"
          name="network"
          id="network-connected"
          onChange={(e) => {
            props.changeNetwork(e.target.value);
          }}
        >
          <option value="kovan">Kovan</option>
          <option value="ethereum">Etheruem Mainnet</option>
          <option value="fantom-testnet">Fantom Testnet</option>
          <option value="fantom-mainnet">Fantom Mainnet</option>
        </select>
        <button onClick={props.addNewAddress}> Add new address </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
      </div>

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
          >
            <Tab label="Balances in wallet" value={1} />
            <Tab
              label="Transactions"
              value={2}
              onClick={() => {
                props.getTransactions();
              }}
            />
          </Tabs>

          <TabPanel value={1} style={{ padding: "0" }}>
            <table className={style.tokenDisplayTable}>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Symbol</th>
                  <th>Balance</th>
                  <th>USD Value</th>
                </tr>
              </thead>
              <tbody>
                {props.balances.map((element, index) => {
                  return (
                    <tr key={index} className={style.token}>
                      <td>
                        {element.logo_url ? (
                          <img
                            src={element.logo_url}
                            width="20px"
                            className={style.tokenImg}
                          />
                        ) : (
                          <div className={style.tokenImg}>T</div>
                        )}
                      </td>
                      <td>{element.contract_ticker_symbol}</td>
                      <td>{element.balance}</td>
                      <td>
                        <span>$</span>
                        {element.USD_value}
                      </td>
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
                  {props.transactions.map((token, index) => {
                    return (
                      <div key={index}>
                        <div> {token.ticker} </div>
                        <div>
                          {" "}
                          {token.amount} {token.ticket}{" "}
                        </div>
                        <div> From : {token.from} </div>
                        <div> To : {token.to} </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};
