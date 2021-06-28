// color props accept 'orange', 'violet', and 'red' as values. More colours can be added as per requirement

import style from "./style.module.scss";

// icons
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const iconStyle = {
  fontSize: "40px",
  marginRight: "15px",
};

export const FancyButton = ({ title, desc, icon, color, onClick }) => {
  return (
    <div
      className={`${style.section} ${color && style[color]}`}
      onClick={onClick}
    >
      {icon === "create" && (
        <AccountBalanceWalletIcon className={style.icon} style={iconStyle} />
      )}
      {icon === "import" && (
        <ImportExportIcon className={style.icon} style={iconStyle} />
      )}
      <div>
        <h2 className={style.section__title}>{title}</h2>
        <p className={style.section__desc}>{desc}</p>
      </div>
    </div>
  );
};
