import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  fff: {
    color: "#fff",
  },
}));

const HeaderMenus = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        className={classes.fff}
        onClick={() => dispatch(push("/favorite"))}
      >
        <FavoriteIcon fontSize="large" />
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
