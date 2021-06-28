// import Wallet from './components/wallet';
import { network } from "./scripts/network.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import { Home } from "./pages/Home/index";
import { Wallet } from "./pages/Wallet/index";
import { Navbar } from "./components/Navbar/index";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Router path="/">
          <Home />
        </Router>

        <Route path="/wallet">
          <Wallet />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
