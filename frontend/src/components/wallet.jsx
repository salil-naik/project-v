
import { useState } from 'react';
import { ethers } from "ethers";


const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    console.log("Private Key", wallet.privateKey);
    console.log("Wallet Address", wallet.address);
    console.log("Wallet Mneumonic", wallet.mnemonic.phrase);

    const walletMnemonic = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase);
    console.log(walletMnemonic);
}


function Wallet() {

    const [privateKey, setPrivateKey] = useState(null);
    const [address, setAddress] = useState(null);

    return(
        <div>
            <button onClick={createWallet}> Create Wallet </button>  
        </div>
    )
} 

export default Wallet;