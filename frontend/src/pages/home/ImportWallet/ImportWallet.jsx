import { ImportWalletModal } from "../../../components/Modal/ImportWalletSection/ImportWalletModal/index";

export const ImportWallet = ({ data }) => {
  return (
    <ImportWalletModal
      open={data.open}
      onClose={data.close}
      onClick={data.onClick}
    />
  );
};
