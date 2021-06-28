import { useState } from "react";
import { ethers } from "ethers";

// material ui
import { Container, Grid } from "@material-ui/core";

// components
import { Navbar } from "../../components/Navbar/index";
import { FancyButton } from "../../components/FancyButton/index";
import { CreateWalletModal } from "../../components/Modal/CreateWalletModal/index";
import { VerifyWalletModal } from "../../components/Modal/VerifyWalletModal/index";

// CSS
import style from "./home.module.scss";

export const Home = () => {
  const [createWalletState, setCreateWalletState] = useState(false);
  const [verificationModalState, setVerificationModalState] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);
  const [tooltip, setTooltip] = useState("Click to copy");

  const createWallet = () => {
    setCreateWalletState(true);
    setTooltip("Click to copy");
    const wallet = ethers.Wallet.createRandom();
    setMnemonic(wallet.mnemonic.phrase);
  };

  const handleClose = () => {
    setCreateWalletState(false);
    setVerificationModalState(false);
  };

  const openVerificationModal = () => {
    setCreateWalletState(false);
    setVerificationModalState(true);
  };

  const openSeedPhraseModal = () => {
    setVerificationModalState(false);
    setCreateWalletState(true);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item sm={8}>
            <h1>Fantom Wallet</h1>
            <p>the clean one</p>
          </Grid>
        </Grid>

        {/* Button section */}
        <div className={style.buttonSection}>
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <FancyButton
                title="Create Wallet"
                desc="Create a crypto wallet"
                color="violet"
                icon="create"
                onClick={createWallet}
              />
            </Grid>
            <Grid item sm={4}>
              <FancyButton
                title="Import Wallet"
                desc="Restore your existing wallet"
                color="orange"
                icon="import"
              />
            </Grid>
          </Grid>
        </div>
      </Container>

      {/* Modals */}
      <CreateWalletModal
        open={createWalletState}
        onClose={handleClose}
        mnemonic={mnemonic}
        nextModal={openVerificationModal}
        tooltip={tooltip}
        setTooltip={setTooltip}
      />

      {/* Verify Modal */}
      <VerifyWalletModal
        open={verificationModalState}
        onClose={handleClose}
        prevModal={openSeedPhraseModal}
      />
    </>
  );
};
