import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

import { NFTCard } from "../../components/NFTCard";
import { TokenDisplay } from "./TokenDisplay/index";
import style from "./explore.module.scss";

import { Grid, Container } from "@material-ui/core";

export const Explore = ({ match }) => {
  const {
    params: { address },
  } = match;

  const [dataLoaded, setDataLoaded] = useState(false);

  const [network, setNetwork] = useState(1);
  const [selectedContract, setSelectedContract] = useState("AllNFTs");

  const [errorNFTs, setErrorNFTs] = useState(false);
  const [errorTokens, setErrorTokens] = useState(false);

  const [tokenBalances, setTokenBalances] = useState([]);
  const [totalBalance, setTotalBalance] = useState(null);

  const [NFTs, setNFTs] = useState([]);
  const [SegregatedNFTs, setSegregatedNFTs] = useState({});
  const [NFTContracts, setNFTContracts] = useState(new Set());
  const [totalNFTs, setTotalNFTs] = useState(0);

  React.useEffect(() => {
    setDataLoaded(false);
    setTokenBalances([]);
    setSegregatedNFTs({});
    setNFTContracts([]);
    setTotalBalance(null);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-mainnet.alchemyapi.io/v2/Hoq2ORelL-pxtuQQE903j61xB_WAQdtj"
    );

    provider.resolveName(address).then((resolved) => {
      console.log(resolved);


      axios
        .get(
          `https://project-v.salilnaik.repl.co/TokenBalances/address/${resolved}/chain/${network}/`
        )
        .then((result) => {

          setTokenBalances(result.data.tokens);
          let total = 0;
          for (let token of result.data.tokens) {
            total += token.USD_value;
          }
          setTotalBalance(total);
          setErrorTokens(false);
          setDataLoaded(true);
        }).catch((err) => {
          console.log(err);
          setErrorTokens(true);

        });;

      axios
        .get(
          `https://project-v.salilnaik.repl.co/NFTs/address/${resolved}/chain/${network}/`
        )
        .then((result) => {
          console.log(result.data.items);
          setNFTs(result.data.items);
          let total = 0;

          for (let token of result.data.items) {
            total += parseFloat(token.balance);


            if (token.nft_data) {
              if (token.nft_data.length > 0) {
                if (token.nft_data[0].external_data) {
                  let tempObj = {};
                  tempObj[token.contract_name] = token.nft_data;
                  setSegregatedNFTs((prevState) => {
                    return { ...prevState, ...tempObj };
                  });
                  setNFTContracts((prevState) => {
                    return new Set([...prevState, token.contract_name]);
                  });
                }
              }
            }
          }

          setTotalNFTs(total);
          setErrorNFTs(false);
          setDataLoaded(true);
        }).catch((err) => {
          console.log(err);
          setErrorNFTs(true);
        });
    });
  }, [address, network]);

  // React.useEffect(() => {
  //     console.log('segregated nft:', SegregatedNFTs)
  // },[SegregatedNFTs])

  const getNetwork = (e) => {
    setNetwork(e.target.value);
  };
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <div className={style.topSection}>
              <h2>{address}'s Wallet</h2>
              <div className={style.inputContainer}>
                <label>Choose network:</label>
                <select onChange={getNetwork}>
                  <option value="1">Ethereum Mainnet</option>
                  <option value="250">Fantom Mainnet</option>
                  <option value="42">Kovan</option>
                  <option value="4002">Fantom Testnet</option>
                </select>
              </div>
            </div>
          </Grid>

          {/* Token Display section */}
          <Grid item sm={6}>
            <div className={style.tokenContainer}>
              <div
                className={style.sectionDetails}
                style={{ padding: "0 15px" }}
              >
                <h2>Tokens & Balances</h2>
                <p>Total balance: {(totalBalance?`$${totalBalance}`:'Loading...')}</p>
              </div>
              {tokenBalances.length !== 0 && dataLoaded ? (
                <div>
                  {tokenBalances.map((token) => (
                    <TokenDisplay
                      token={token}
                      address={address}
                      key={`${token.contract_name}${address}`}
                    />
                  ))}
                </div>
              ) : (
                <div className={style.loading}>Loading tokens...</div>
              )}
            </div>
          </Grid>

          {/* NFT display Section */}
          <Grid item sm={6}>
            <div className={style.nftContainer}>
              <div className={style.sectionDetails}>
                <h2>NFTs</h2>
                <p>Total NFTs: {totalNFTs}</p>
              </div>

              {NFTs.length !== 0 && errorNFTs === false && (
                <Grid item sm={12}>
                  <div className={style.btnContainer}>
                    <div className={style["rail"]}>
                      <button
                        onClick={() => {
                          console.log(SegregatedNFTs);
                          setSelectedContract("AllNFTs");
                        }}
                        className={`${style.btn} ${selectedContract === "AllNFTs"
                            ? style.selectedButton
                            : ""
                          }`}
                      >
                        All NFTs
                      </button>
                      {Array.from(NFTContracts).map((contract) => (
                        <button
                          key={`${address}${contract}`}
                          onClick={() => {
                            console.log(SegregatedNFTs[contract]);
                            setSelectedContract(contract);
                          }}
                          className={`${style.btn} ${selectedContract === contract
                              ? style.selectedButton
                              : ""
                            }`}
                        >
                          {contract}
                        </button>
                      ))}
                    </div>
                  </div>
                </Grid>
              )}

              {selectedContract === "AllNFTs" &&
                (SegregatedNFTs && NFTs.length !== 0 && errorNFTs === false && dataLoaded ? (
                  <Grid container spacing={3}>
                    {Object.keys(SegregatedNFTs).map((contract) =>
                      SegregatedNFTs[contract].map(
                        (nft) =>
                          nft.external_data && (
                            <Grid item sm={6}>
                              <div
                                key={`${address}${nft.external_data.image}${nft.external_data.name}`}
                              >
                                <NFTCard
                                  url={nft.external_data.image}
                                  description={nft.external_data.description}
                                  name={nft.external_data.name}
                                />
                              </div>
                            </Grid>
                          )
                      )
                    )}
                  </Grid>
                ) : (
                  <div className={style.loading}>Loading NFTs...</div>
                ))}

              {selectedContract !== "AllNFTs" && NFTs.length !== 0 && (
                <Grid container spacing={3}>
                  {SegregatedNFTs[selectedContract].map((nft) => (
                    <Grid item sm={6}>
                      <div
                        key={`${address}${nft.external_data.image}${nft.external_data.name}`}
                      >
                        {nft.external_data && (
                          <NFTCard
                            url={nft.external_data.image}
                            description={nft.external_data.description}
                            name={nft.external_data.name}
                          />
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
