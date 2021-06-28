import { useState } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";

export const VerifyWalletModal = ({ open, onClose, prevModal }) => {
  const [verifyMnemonic, setVerifyMnemonic] = useState("");
  const [walletPw, setWalletPw] = useState('');

  const onChange = ({ name, value, id }) => {};
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Verify Seed Phrase</h3>

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
        />

        <div className={modalStyle.btnSection}>
          <div className={modalStyle.btn} onClick={prevModal}>
            Back to seed phrase
          </div>
          <div className={modalStyle.btn}>Verify &amp; Proceed</div>
        </div>
      </div>
    </Modal>
  );
};
