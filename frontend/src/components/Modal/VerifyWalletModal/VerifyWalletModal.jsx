import { useState } from "react";

// material ui
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";

// components
import { Input } from "../../Input/index";

export const VerifyWalletModal = ({ open, onClose, prevModal, onClick }) => {
  const [verifyMnemonic, setVerifyMnemonic] = useState("");
  const [walletPw, setWalletPw] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick(verifyMnemonic, walletPw);
  };

  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Verify Seed Phrase</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            Label="Enter Mnemonic"
            Name="Verify Mnemonic"
            Value={verifyMnemonic}
            Id="verify-mnemonic"
            Type="text"
            Placeholder="Seed phrase"
            OnChange={(e) => {
              setVerifyMnemonic(e.target.value);
            }}
            Required
          />

          <Input
            Label="Add wallet password"
            Name="Wallet Password"
            Value={walletPw}
            Id="add-wallet-password"
            Type="password"
            OnChange={(e) => {
              setWalletPw(e.target.value);
            }}
            Required
          />

          <div className={modalStyle.btnSection}>
            <div className={modalStyle.btn} onClick={prevModal}>
              Back to seed phrase
            </div>
            <button type="submit" className={modalStyle.btn}>
              Verify &amp; Proceed
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
