import { useState, useEffect } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";

export const UnlockWallet = ({ open, onClose, prevModal, unlockWallet }) => {
  const [pass, SetPass] = useState(null);

  const unlockWalletPassword = () => {
    unlockWallet(pass);
  }

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
          OnChange = {(e) => { SetPass(e.target.value) }}
          Required
        />

        <div className={`${modalStyle.btnSection} ${modalStyle.flexEnd}`}>
            <button type="submit" className={modalStyle.btn} onClick = {unlockWalletPassword}>
              Unlock
            </button>
          </div>

      </div>
    </Modal>
  );
};
