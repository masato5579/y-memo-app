import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

//style
const useStyles = makeStyles({
  button: {
    backgroundColor: "#50EDB2",
    color: "#fff",
    fontSize: 20,
    height: 60,
    marginBottom: 16,
    width: "100%",
  },
});

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
