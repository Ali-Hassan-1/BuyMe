import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

import logo from "../../assets/commerce_logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  const handleCartClick = () => {
    // move to cart page

    // show cart data
    console.log("Click On cart!!");
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce logo"
              height="25px"
              className={classes.image}
            />
            BuyMe
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            {location.pathname === "/" && (
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart onClick={handleCartClick} />
                </Badge>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
