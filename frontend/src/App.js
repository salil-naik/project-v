import { useState } from "react";
import { network } from "./scripts/network.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ethers } from "ethers";

// pages
import { Home } from "./pages/Home/index";
import { Wallet } from "./pages/Wallet/index";
import { Navbar } from "./components/Navbar/index";
import { Explore } from "./pages/Explore/index";
import { SpiritSwap } from './pages/SpiritSwap/index';

function App() {
  const [address, setAddress] = useState([]);
  const [verified, setVerified] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);

  const addNewAddress = () => {
    const number = address.length;
    console.log(number);
    console.log(mnemonic);

    const walletMnemonic = ethers.Wallet.fromMnemonic(
      mnemonic,
      `m/44'/60'/0'/0/${number}`
    );

    setAddress((arr) => [
      ...arr,
      {
        address: walletMnemonic.address,
        privateKey: walletMnemonic.privateKey,
      },
    ]);
  };

  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/" exact>
          <Home
            setAddress={setAddress}
            setVerified={setVerified}
            verified={verified}
            setMnemonic={setMnemonic}
            mnemonic={mnemonic}
          />
        </Route>

        <Route path="/wallet">
          <Wallet
            address={address}
            verified={verified}
            addNewAddress={addNewAddress}
          />
        </Route>
        <Route path="/address/:address" component={Explore} />

        <Route path="/spiritswap" component={ SpiritSwap } />

      </Switch>
    </div>
  );
}

export default App;
