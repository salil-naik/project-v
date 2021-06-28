import { useState } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";

export const CreateWalletModal = ({ open, onClose, mnemonic, nextModal, tooltip, setTooltip }) => {
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Wallet Seed Phrase</h3>
        <div
          className={modalStyle.seedphraseContainer}
          onClick={() => {
            navigator.clipboard.writeText(mnemonic);
            setTooltip("Copied");
          }}
        >
          <p className={modalStyle.phrase}>{mnemonic}</p>
          <span className={modalStyle.tooltip}>{tooltip}</span>
        </div>
        <p className={modalStyle.msg}>
          Please save the above seed phrase. You will need it for the
          verification process.
        </p>

        <div className={`${modalStyle.btnSection} ${modalStyle.flexEnd}`}>
          <div className={modalStyle.btn} onClick={nextModal}>
            Proceed
          </div>
        </div>
      </div>
    </Modal>
  );
};
