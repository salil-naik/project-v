import style from "./navbar.module.scss";
import { Container, Grid } from "@material-ui/core";
import {Link} from "react-router-dom";

import Logo from '../../Spectre.png';

// components
import { Search } from "../Search/index";

export const Navbar = () => {
  return (
    <nav className={style.nav}>
      <Container>
        <Grid container>
          <Grid item sm={6}>
            <Link to="/"><img src={Logo} className={style.logo}/></Link>
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
