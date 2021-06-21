import Wallet from './components/wallet';
import {EthereumMainnet, Rinkeby} from './scripts/network.js';

function App() {
  return (
    <div className="App">
      <Wallet network={Rinkeby}/>
    </div>
  );
}

export default App;
