import Wallet from './components/wallet';
import Search from './components/search'
import {network} from './scripts/network.js';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Search />
      <br />

      <Wallet network = {network}/>
    </div>
  );
}

export default App;
