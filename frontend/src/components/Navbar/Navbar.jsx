import style from "./navbar.module.scss";
import { Container, Grid } from "@material-ui/core";

// components
import { Search } from "../Search/index";

export const Navbar = () => {
  return (
    <nav className={style.nav}>
      <Container>
        <Grid container>
          <Grid item sm={6}>
            <div>Logo</div>
          </Grid>
          <Grid item sm={6}>
            <div className={style.searchContainer}>
              <Search />
            </div>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
};
