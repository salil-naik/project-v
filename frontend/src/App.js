import { useState } from 'react';
import { network } from "./scripts/network.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import { Home } from "./pages/Home/index";
import { Wallet } from "./pages/Wallet/index";
import Explore from './pages/Explore/Explore';
import { Navbar } from "./components/Navbar/index";

function App() {

  const [address, SetAddress] = useState();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Router path="/" exact>
          <Home />
        </Router>

        <Route path="/wallet">
          <Wallet/>
        </Route>
        <Route path="/address/:address" component={Explore} />
      </Switch>
    </Router>
  );
}

export default App;
