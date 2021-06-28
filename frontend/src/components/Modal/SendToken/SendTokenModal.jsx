import { useState } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { ethers } from "ethers";

export const SendTokenModal = ({ open, onClose, prevModal, data, network, walletData }) => {
  const [tokenAddress, SetTokenAddress] = useState("");
  const [receiverAddress, SetReceiverAddress] = useState("");



  const submitTransaction = () => {
    console.log(tokenAddress, receiverAddress, network, walletData);

    if(network != undefined) {
      const provider = new ethers.providers.JsonRpcProvider(network);
      const signer = provider.getSigner();

      const walletPrivateKey = new ethers.Wallet(walletData.privateKey);

      // const tx = {
      //   // from : walletData.privateKey,
      //   to : receiverAddress,
      //   value : ethers.utils.parseEther(send_token_amount),
      //   nonce : window.ethersProvider.getTransactionCount(send_account, 'latest'),
      //   gasLimit : ethers.utils.hexlify(gas_limit), // 100000
      //   gasPrice : gas_price
      // }
      
    }


  };


  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}></h3>
        {/* {console.log("data",data )} */}
        {/* {console.log("network", network )} */}


        <label for="crypto-to-send"> Choose Crypto </label>
        <Select
          labelId="crypto-to-send"
          id="crypto-to-send"
          onChange={(e) => SetTokenAddress(e.target.value)}
        >
          {
            data.map((element, index) => {
                return(
                  <MenuItem key={index} value={element.contract_address}> {element.contract_ticker_symbol} : {element.contract_name} </MenuItem>
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
          Type="text"
          Name="Receiver Address"
          OnChange={(e) => {
            SetReceiverAddress(e.target.value);
          }}
          Required
        /> 

        <div className={modalStyle.btnSection}>
            {/* {data.contract_name} */}
          <div className={modalStyle.btn} onClick={submitTransaction}> Send </div>
        </div>
      </div>
    </Modal>
  );
};
