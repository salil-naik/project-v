
// import modalStyle from "../modal.module.scss";
import { Modal } from "@material-ui/core";

export const NFTCardModal = ({ open, onClose, url, description, name}) => {
  return (
    <Modal open={open} 
    onClose={onClose} 
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    //className={modalStyle.overlay}
    >
        <div style={{backgroundColor: 'white'}}>
        <h2 id="simple-modal-title">{name}</h2>
        <img src={url} alt={description} style={{maxWidth: "500px"}} />
        <p id="simple-modal-description">{description}</p></div>
    </Modal>
  );
};