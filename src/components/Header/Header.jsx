import React, { useState, useCallback } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { HeaderMenus, ClosableDrawer } from "../Header";
import { ElevationScroll } from "./index";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    background: "#F84CAC",
    [theme.breakpoints.down("sm")]: {
      height: 60,
    },
  },
  toolBar: {
    margin: "0 auto",
    width: "95%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  heading: {
    fontSize: "1.7rem",
    color: "#fff",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

const Header = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  //Drawerの開け閉め
  const handleDrawerToggle = useCallback(
    (e) => {
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar className={classes.toolBar}>
            <Typography
              variant="h1"
              onClick={() => dispatch(push("/"))}
              className={classes.heading}
            >
              YoutubeMemo
            </Typography>
            {isSignedIn && (
              <div className={classes.iconButtons}>
                <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
