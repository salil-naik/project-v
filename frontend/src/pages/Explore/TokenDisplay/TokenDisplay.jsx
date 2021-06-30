import style from "../explore.module.scss";
import tknImg from "../../../images/token.png";

export const TokenDisplay = ({ token }) => {
  return (
    <div className={style.token}>
      <div className={style.left}>
        <img
          src={token.logo_url}
          onError={(e)=>{e.target.onerror = null; e.target.src=tknImg}}
          alt="Token Logo"
          className={style.tokenLogo}
        />
        <h3 className={style.tokenName}>
          {token.contract_name} ({token.contract_ticker_symbol})
        </h3>
      </div>

      <div className={style.tokenBalance}>
        <div>{token.balance} {token.contract_ticker_symbol}</div>
        <div>${token.USD_value}</div>
      </div>
    </div>
  );
};
