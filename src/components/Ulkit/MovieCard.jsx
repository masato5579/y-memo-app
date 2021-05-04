import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    // height: "auto",
  },
  cardcontent: {
    height: "100%",
  },
  button: {
    textAlign: "left",
  },
  video: {
    height: "710px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "200px",
    },
  },
  url: {
    fontSize: "1.1rem",
    width: "95%",
    margin: "0 auto",
    padding: "10px 10px 10px 0",
  },
}));

const MovieCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia>
        <iframe
          src={props.url}
          title="youtube"
          width="100%"
          height="620px"
          className={classes.video}
        />
      </CardMedia>
      <div className={classes.url}>
        <p className="over-flow-wrap">URL:{props.url}</p>
      </div>
    </Card>
  );
};

export default MovieCard;
