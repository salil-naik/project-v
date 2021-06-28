import { useState } from "react";

// material ui
import modalStyle from "../../modal.module.scss";
import { Modal } from "@material-ui/core";

// components
// import { Input } from "../../Input/index";

export const ImportWalletModal = ({ open, onClose, prevModal, onClick }) => {
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Import or Restore Wallet</h3>

        <div className={`${modalStyle.btnSection} ${modalStyle.flexEnd}`}>
          <button type="submit" className={modalStyle.btn}>
            Verify &amp; Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
};
