import { useState } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { ethers } from "ethers";

import { abi } from './tokenAbi.js';

export const SendTokenModal = ({ open, onClose, prevModal, data, network, walletData, explorer }) => {
  const [tokenAddress, SetTokenAddress] = useState("");
  const [receiverAddress, SetReceiverAddress] = useState("");
  const [amount, SetAmount] = useState(0);
  const [decimal, SetDecimal] = useState(null);
  const [msg, SetMsg] = useState("");
  const [visible, SetVisible] = useState("none");



  const submitTransaction = () => {
    console.log(tokenAddress, receiverAddress, network, walletData);

    if(network != undefined) {
      const provider = new ethers.providers.JsonRpcProvider(network);
      const signer = provider.getSigner();

      const walletPrivateKey = new ethers.Wallet(walletData.privateKey);

      const wallet = walletPrivateKey.connect(provider)

      wallet.getGasPrice().then(price => {
        let gas_price = ethers.utils.hexlify(parseInt(price));
        console.log(`gas_price: ${ gas_price }`);

        if(tokenAddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
          console.log("eth");
            const tx = {  
              to : receiverAddress,
              value : ethers.utils.parseEther(amount),
              // nonce : wallet.getTransactionCount(walletData.address, 'latest'),
              gasLimit : ethers.utils.hexlify('0x100000'),// 100000
              gasPrice : gas_price
            }

            try{
              wallet.sendTransaction(tx).then((transaction) => 
              {
                  console.log(transaction);
                  alert('Send finished!');
                  SetMsg(`${explorer}/tx/${transaction.hash}`);
                  SetVisible("flex")
              });
              } catch(error){
                  alert("failed to send!!", error);
              }
        }

        else if (tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") {
          console.log("ftm");

          const tx = {  
            to : receiverAddress,
            value : ethers.utils.parseEther(amount),
            // nonce : wallet.getTransactionCount(walletData.address, 'latest'),
            gasLimit : ethers.utils.hexlify('0x100000'),// 100000
            gasPrice : gas_price
          }

          try{
            wallet.sendTransaction(tx).then((transaction) => 
            {
                console.log(transaction);
                alert('Send finished!');
                SetMsg(`${explorer}tx/${transaction.hash}`);
                SetVisible("flex")
            })
            .catch(err => alert(err))
            } 
            catch(error){
                alert("failed to send!!", error);
            }
        }
        else {

          const contract = new ethers.Contract(tokenAddress, abi, wallet);

          try{

              contract.transfer(receiverAddress, ethers.utils.parseUnits(amount, decimal))
              .then((result) => {
                console.log(result);
              })
              .catch(err => alert(err))

            } 
            
            catch(error) {
                alert("failed to send!!", error);
            }

        }


      });
      
    }

  };

  const SetIndexToTokenAddress = (index) => {
    SetTokenAddress(data[index].contract_address);
    SetDecimal(data[index].decimals);
  }


  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}></h3>

        <label htmlFor="crypto-to-send"> Choose Crypto </label>
        <Select
          labelId="crypto-to-send"
          id="crypto-to-send"
          onChange={(e) => SetIndexToTokenAddress(e.target.value)}
        >
          {
            data.map((element, index) => {
                return(
                  <MenuItem key={index} value={index}> {element.contract_ticker_symbol} : {element.contract_name} </MenuItem>
                )
            })
          }

        </Select>

        <Input
          Label="Input Address"
          Id="receiver-address"
          Type="text"
          Name="Receiver Address"
          OnChange={(e) => {
            SetReceiverAddress(e.target.value);
          }}
          Required
        /> 


          <Input
          Label="Amount"
          Id="Enter Amount"
          Type="number"
          Name="Amount"
          OnChange={(e) => {
            SetAmount(e.target.value);
          }}
          Required
        /> 

        <div style={{ display : `${visible}` }}> <a href={msg} target="_blank"> Check on Etherscan </a> </div>

        <div className={modalStyle.btnSection}>
            {/* {data.contract_name} */}
          <div className={modalStyle.btn} onClick={submitTransaction}> Send </div>
        </div>
      </div>
    </Modal>
  );
};
