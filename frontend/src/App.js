import Wallet from './components/wallet';
import Search from './components/search'
import {network} from './scripts/network.js';

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
