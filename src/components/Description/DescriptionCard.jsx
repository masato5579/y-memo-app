import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#F84BAC",
    fontSize: "1rem",
  },
}));
const DescriptionCard = (props) => {
  const classes = useStyles();

  return (
    <div className="description-row">
      <div className="description-paragraph">
        <h3>{props.heading}</h3>
        <div className="spacer--extra-small" />
        {props.link && (
          <Button className={classes.button} href={props.link} target="_blank">
            {props.link}
          </Button>
        )}
        {props.paragraph && <p className="red">{props.paragraph}</p>}
        <p></p>
      </div>
      <div className="spacer--medium" />
      <div className="descrption-img ">
        <a href={props.url} target="_blank" rel="noreferrer">
          <img src={props.url} alt="YoutubeMemo手順の画像" />
        </a>
      </div>
    </div>
  );
};

export default DescriptionCard;
