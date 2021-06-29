import { useState, useEffect } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";

export const UnlockWallet = ({ open, onClose, prevModal, unlockWallet }) => {

  const onChange = ({ name, value, id }) => {};
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}> Unlock Wallet </h3>


        <Input
                  Label="Already have a wallet? Enter password"
                  Id="enter-password"
                  Type="password"
                  Name="enter-password"
                  OnChange={(e) => {
                    unlockWallet(e.target.value);
                  }}
                  Required
                />
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
