
import { useState } from 'react';
import { ethers } from "ethers";


const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    console.log("Private Key", wallet.privateKey);
    console.log("Wallet Address", wallet.address);
    console.log("Wallet Mneumonic", wallet.mnemonic);

}


function Wallet() {

    const [privateKey, setPrivateKey] = useState(null);
    const [address, setAddress] = useState(null);

    return(
        <div>
            <div onClick={createWallet}> Wallet </div>  
        </div>
    )
} 

export default Wallet;