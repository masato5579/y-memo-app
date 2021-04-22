import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    height: "100vh",
  },
  cardcontent: {
    height: "100%",
  },
});

const MovieCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia>
        <iframe src={props.url} title="youtube" width="100%" height="620px" />
      </CardMedia>
      <CardContent className={classes.cardcontent}>
        <Typography gutterBottom variant="h5" component="h2">
          URL: {props.url}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Youtubeでメモをとって学習に役立てよう
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
