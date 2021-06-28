import Wallet from './components/wallet';
import Search from './components/Search/search'
// import {network} from './scripts/network.js';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import {Home} from "./pages/home/index";

function App() {
  return (
    <div className="App">

      {/* <div> */}

      <Wallet/>
      {/* <Home /> */}
    </div>
  );
}

export default App;
