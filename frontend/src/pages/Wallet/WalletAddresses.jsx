import { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import style from "./wallet.module.scss";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const WalletAddresses = (props) => {
  const [chosenBalances, SetChosenBalances] = useState(true);
  const [value, setValue] = useState(1);
  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={style["dropdown-section"]}>
        <div className={style.dropdownContainer}>
          <label htmlFor="network" className={style.label}>
            Choose a network
          </label>
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
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div className={style.dropdownContainer}>
            <label htmlFor="current-address" className={style.label}>
              Choose Address
            </label>
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
          <button
            onClick={props.addNewAddress}
            className={style.addAddress}
            title="add address"
          >
            <AddCircleIcon />
          </button>
        </div>
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
                      <div key={index} className={style.txRow}>
                        <div style={{ display: "flex" }}>
                          {/* <div className={style.name}>{token.ticker}</div> */}
                          <div className={style.tknAmnt}>
                            {token.amount} {token.ticker}
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className={style.tknAdd}>
                            <b>From</b> : {token.from}
                          </div>{" "}
                          <span> --- </span>
                          <div className={style.tknAdd}>
                            <b>To</b> : {token.to}
                          </div>
                        </div>
                         <div style={{ display: "flex" }}>
                          <div className={style.tknAdd}>
                            <a href={`${props.explorer}tx/${token.tx_hash}`} target="_blank"> Explorer </a>
                          </div>{" "}
                        </div>
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
