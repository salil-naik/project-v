import Wallet from './components/wallet';

import {network} from './scripts/network.js';

function App() {
  return (
    <div className="App">
      
      
      <Wallet network = {network}/>
    </div>
  );
}

export default App;
