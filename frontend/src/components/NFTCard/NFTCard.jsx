//import style from "./navbar.module.scss";
import { useState } from "react";
import { NFTCardModal } from "../NFTCardModal/NFTCardModal";



export const NFTCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleOpen = () => {
        setIsOpen(true);
    }
    const handleClose = () => {
        setIsOpen(false);
      };

  return (
    <div>
        <p>{props.name}</p>
        <img onClick={handleOpen} src={props.url} alt={props.description} style={{ maxWidth: '500px' }}/>
        <p>{props.description}</p>
        <NFTCardModal
          open={isOpen}
          onClose={handleClose}
          url={props.url}
          description={props.description}
          name={props.name}
        />
    </div>
  );
};