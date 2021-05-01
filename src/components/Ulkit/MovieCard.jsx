import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    height: "100vh",
  },
  cardcontent: {
    height: "100%",
  },
  button: {
    textAlign: "left",
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
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.button}
        >
          <Button
            onClick={() => props.FavoToggle()}
            style={{ color: props.favo ? "red" : "#000" }}
          >
            <FavoriteIcon />
            {props.favo ? (
              <p>お気に入り登録を解除する</p>
            ) : (
              <p>お気に入りに登録する</p>
            )}
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
