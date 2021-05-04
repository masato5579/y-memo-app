import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#F84BAC",
    color: "#fff",
    fontSize: 20,
    height: 60,
    marginBottom: 16,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
}));

//primaryButton
const PrimaryButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
