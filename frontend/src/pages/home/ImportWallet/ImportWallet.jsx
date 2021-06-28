import { ImportWalletModal } from "../../../components/Modal/ImportWalletSection/ImportWalletModal/index";

export const ImportWallet = ({ importWalletData }) => {
  return (
    <ImportWalletModal
      open={importWalletData.open}
      onClose={importWalletData.close}
    />
  );
};
