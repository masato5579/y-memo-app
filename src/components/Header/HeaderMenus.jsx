import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fff: {
    color: "#fff",
  },
}));

const HeaderMenus = (props) => {
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.fff}>
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
      <IconButton
        className={classes.fff}
        onClick={(e) => props.handleDrawerToggle(e)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
