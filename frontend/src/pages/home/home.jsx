import style from "./home.module.scss";

// material ui
import { Container, Grid } from "@material-ui/core";

// components
import { Navbar } from "../../components/Navbar/index";
import { FancyButton } from "../../components/FancyButton/index";

export const Home = () => {
  const createWallet = () => {
    console.log("create");
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
    </>
  );
};
