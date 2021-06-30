//import style from "./navbar.module.scss";
import { useState } from "react";
import { NFTCardModal } from "../NFTCardModal/NFTCardModal";
import style from "./card.module.scss";

export const NFTCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={style.nft}>
      <img
        onClick={handleOpen}
        src={props.url}
        alt={props.description}
        className={style.nft__img}
      />
      <p className={style.nft__name}>{props.name}</p>
      <p className={style.nft__desc}>{props.description}</p>
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
