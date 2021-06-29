import { useState, useEffect } from "react";
import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";
import { Input } from "../../Input/index";

export const ReceiveTokenModal = ({
  open,
  onClose,
  prevModal,
  data,
  walletAddress,
}) => {
  const [str, SetStr] = useState();
  const [tooltip, setTooltip] = useState("Click to copy");

  useEffect(() => {
    SetStr(
      `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${walletAddress}&choe=UTF-8`
    );
  }, [walletAddress]);

  const onChange = ({ name, value, id }) => {};
  return (
    <Modal open={open} onClose={onClose} className={modalStyle.overlay}>
      <div className={modalStyle.card}>
        <h3 className={modalStyle.title}>Receive</h3>

        <img src={str} className={modalStyle.qr}/>

        <div
          className={modalStyle.seedphraseContainer}
          onClick={() => {
            navigator.clipboard.writeText(walletAddress);
            setTooltip("Copied");
          }}
        >
          <p className={modalStyle.phrase} style={{fontSize: '16px'}}>{walletAddress}</p>
          <span className={modalStyle.tooltip}>{tooltip}</span>
        </div>
      </div>
    </Modal>
  );
};
