import { useState } from "react";

// material ui
import modalStyle from "../../modal.module.scss";
import { Modal } from "@material-ui/core";

// components
import { Input } from "../../../Input/index";

export const ImportWalletModal = ({ open, onClose, onClick }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick(mnemonic, password);
  }
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Import or Restore Wallet</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Input
            Label="Import Mnemonic"
            Name="import mnemonic"
            Value={mnemonic}
            Id="import-mnemonic"
            Type="text"
            Placeholder="Seed phrase"
            OnChange={(e) => {
              setMnemonic(e.target.value);
            }}
            Required
          />

          <Input
            Label="Password"
            Name="Verify Mnemonic"
            Value={password}
            Id="import-wallet-password"
            Type="password"
            OnChange={(e) => {
              setPassword(e.target.value);
            }}
            Required
          />

          <div className={`${modalStyle.btnSection} ${modalStyle.flexEnd}`}>
            <button type="submit" className={modalStyle.btn}>
              Import Wallet
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
