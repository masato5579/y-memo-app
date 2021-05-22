import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DescriptionIcon from "@material-ui/icons/Description";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  fff: {
    color: "#fff",
  },
  icon: {
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
}));

const HeaderMenus = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        className={classes.fff}
        onClick={() => dispatch(push("/description"))}
      >
        <DescriptionIcon className={classes.icon} />
      </IconButton>
      <IconButton
        className={classes.fff}
        onClick={() => dispatch(push("/favorite"))}
      >
        <FavoriteIcon className={classes.icon} />
      </IconButton>
      <IconButton
        className={classes.fff}
        onClick={(e) => props.handleDrawerToggle(e)}
      >
        <MenuIcon className={classes.icon} />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
