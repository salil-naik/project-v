import { useState, useEffect } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";

export const ReceiveTokenModal = ({ open, onClose, prevModal, data, walletAddress }) => {
  const [str , SetStr] = useState();
  const [message, SetMessage] = useState("");

  useEffect(() => {
    SetStr(`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${walletAddress}&choe=UTF-8`);
  }, [walletAddress])

  const onChange = ({ name, value, id }) => {};
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Receive </h3>

        <img src={str} />

        <div
          className={modalStyle.seedphraseContainer}
          onClick={() => {
            navigator.clipboard.writeText(walletAddress);
            SetMessage("Copied");
          }}
        >
          {walletAddress}
        </div>
          
        <p> {message} </p>
{/* 
        <Input
          Label="Enter Mnemonic"
          Id="verify-mnemonic"
          Type="text"
          Name="Verify Mnemonic"
          Value={verifyMnemonic}
          Placeholder="Seed phrase"
          OnChange={(e) => {
            setVerifyMnemonic(e.value);
          }}
          Required
        />

        <Input
          Label="Add wallet password"
          Id="add-wallet-password"
          Type="password"
          Name="Wallet Password"
          Value={walletPw}
          OnChange={(e) => {
            setWalletPw(e.value);
          }}
          Required
        /> */}

      </div>
    </Modal>
  );
};
